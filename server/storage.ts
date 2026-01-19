import {
  users,
  waitlist,
  type User,
  type InsertUser,
  type Waitlist,
  type InsertWaitlist,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// ✅ Type used by Google OAuth
export type UpsertUser = {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
};

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Waitlist operations
  createWaitlistEntry(entry: InsertWaitlist): Promise<Waitlist>;
  getWaitlistEntries(): Promise<Waitlist[]>;
  getWaitlistEntryByUserId(userId: string): Promise<Waitlist | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  // ✅ REQUIRED for Google OAuth
  async upsertUser(user: UpsertUser): Promise<User> {
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    if (existing.length > 0) {
      const [updated] = await db
        .update(users)
        .set({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImageUrl: user.profileImageUrl,
        })
        .where(eq(users.id, user.id))
        .returning();

      return updated;
    }

    const [created] = await db.insert(users).values(user).returning();
    return created;
  }

  async createWaitlistEntry(entry: InsertWaitlist): Promise<Waitlist> {
    const [created] = await db.insert(waitlist).values(entry).returning();
    return created;
  }

  async getWaitlistEntries(): Promise<Waitlist[]> {
    return await db.select().from(waitlist).orderBy(desc(waitlist.createdAt));
  }

  async getWaitlistEntryByUserId(
    userId: string
  ): Promise<Waitlist | undefined> {
    const [entry] = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.userId, userId));
    return entry;
  }
}

export const storage = new DatabaseStorage();
