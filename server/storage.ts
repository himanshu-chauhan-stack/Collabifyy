import { users, waitlist, type User, type InsertUser, type Waitlist, type InsertWaitlist } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
<<<<<<< HEAD
    getUser(id: string): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
    createUser(user: InsertUser): Promise<User>;
    createWaitlistEntry(entry: InsertWaitlist): Promise<Waitlist>;
    getWaitlistEntryByEmail(email: string): Promise<Waitlist | undefined>;
    getWaitlistEntryByUserId(userId: string): Promise<Waitlist | undefined>;
=======
  // User operations - required for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Waitlist operations
  createWaitlistEntry(entry: InsertWaitlist): Promise<Waitlist>;
  getWaitlistEntries(): Promise<Waitlist[]>;
  getWaitlistEntryByUserId(userId: string): Promise<Waitlist | undefined>;
>>>>>>> 5f3de75ab183b82d4bf537ba80012103526b0b2d
}

export class DatabaseStorage implements IStorage {
    async getUser(id: string): Promise<User | undefined> {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        return user;
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        const [user] = await db.select().from(users).where(eq(users.email, email));
        return user;
    }

    async createUser(insertUser: InsertUser): Promise<User> {
        const [user] = await db.insert(users).values(insertUser).returning();
        return user;
    }

<<<<<<< HEAD
    async createWaitlistEntry(entry: InsertWaitlist): Promise<Waitlist> {
        const [newItem] = await db.insert(waitlist).values(entry).returning();
        return newItem;
    }

    async getWaitlistEntryByEmail(email: string): Promise<Waitlist | undefined> {
        const [entry] = await db.select().from(waitlist).where(eq(waitlist.email, email));
        return entry;
    }

    async getWaitlistEntryByUserId(userId: string): Promise<Waitlist | undefined> {
        const [entry] = await db.select().from(waitlist).where(eq(waitlist.userId, userId));
        return entry;
    }
=======
  async getWaitlistEntries(): Promise<Waitlist[]> {
    return await db
      .select()
      .from(waitlist)
      .orderBy(desc(waitlist.createdAt));
  }

  async getWaitlistEntryByUserId(userId: string): Promise<Waitlist | undefined> {
    const [entry] = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.userId, userId));
    return entry;
  }
>>>>>>> 5f3de75ab183b82d4bf537ba80012103526b0b2d
}

export const storage = new DatabaseStorage();
