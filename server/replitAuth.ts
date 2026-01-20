import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

/**
 * Create session middleware
 * IMPORTANT:
 * - secure MUST be true
 * - sameSite MUST be "none"
 * for cross-domain OAuth (Render ↔ Vercel)
 */
export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);

  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });

  const isProduction = process.env.NODE_ENV === "production";
  
  return session({
    name: "collabifyy.sid",
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,      // 🔒 true in production (HTTPS), false in dev (HTTP)
      sameSite: isProduction ? "none" : "lax",  // 🌍 "none" for cross-domain in prod, "lax" for local dev
      maxAge: sessionTtl,
    },
  });
}

/**
 * Setup Passport + Google OAuth
 */
export async function setupAuth(app: Express) {
  // Required for secure cookies behind Render proxy
  app.set("trust proxy", 1);

  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  /**
   * Google OAuth strategy
   */
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `${process.env.BACKEND_URL}/api/callback`,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const userData = {
            id: profile.id,
            email: profile.emails?.[0]?.value,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            profileImageUrl: profile.photos?.[0]?.value,
          };

          await storage.upsertUser(userData);
          done(null, userData);
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.serializeUser((user: any, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(async (id: string, cb) => {
    try {
      const user = await storage.getUser(id);
      cb(null, user);
    } catch (err) {
      cb(err);
    }
  });

  /**
   * Auth routes
   */

  // Start Google OAuth
  app.get(
    "/api/login",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  // Google OAuth callback
  app.get(
    "/api/callback",
    passport.authenticate("google", {
      failureRedirect: `${process.env.FRONTEND_URL}/auth`,
    }),
    (_req, res) => {
      // Redirect to waitlist after successful login
      res.redirect(`${process.env.FRONTEND_URL}/waitlist?type=creator`);
    }
  );

  // Logout - supports both GET (for direct links) and POST (for API calls)
  const handleLogout = (req: any, res: any) => {
    req.logout(() => {
      req.session.destroy(() => {
        // For POST requests, return JSON; for GET, redirect
        if (req.method === "POST") {
          res.json({ message: "Logged out successfully" });
        } else {
          res.redirect(process.env.FRONTEND_URL || "/");
        }
      });
    });
  };
  
  app.get("/api/logout", handleLogout);
  app.post("/api/logout", handleLogout);
}

/**
 * API auth guard
 */
export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
