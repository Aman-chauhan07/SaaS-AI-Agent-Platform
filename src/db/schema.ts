import { nanoid } from "nanoid"; // nanoid is used to generate unique IDs (though not used directly here)
import { pgTable, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";
import { AgentIdView } from "@/app/module/agents/ui/views/agent-id-view";
// pgTable: to define a table
// text, timestamp, boolean: column types for PostgreSQL tables

// Users table
export const user = pgTable("user", {
  id: text("id").primaryKey(), // Primary key column (unique ID for each user)
  name: text("name").notNull(), // User's name (cannot be null)
  email: text("email").notNull().unique(), // User's email (unique and required)
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false) // Default value is false
    .notNull(), // Cannot be null
  image: text("image"), // Optional: URL of user's profile image
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date()) // Auto-set to current date/time on creation
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date()) // Auto-set to current date/time on creation
    .notNull(),
});

// Sessions table
export const session = pgTable("session", {
  id: text("id").primaryKey(), // Unique ID for session
  expiresAt: timestamp("expires_at").notNull(), // When the session expires
  token: text("token").notNull().unique(), // Session token (unique)
  createdAt: timestamp("created_at").notNull(), // When session was created
  updatedAt: timestamp("updated_at").notNull(), // Last updated timestamp
  ipAddress: text("ip_address"), // Optional: IP address of user during session
  userAgent: text("user_agent"), // Optional: browser/device info
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  // Links session to a user. If user is deleted, their sessions are deleted too.
});

// Accounts table (for OAuth or external accounts)
export const account = pgTable("account", {
  id: text("id").primaryKey(), // Unique ID for account record
  accountId: text("account_id").notNull(), // Provider-specific account ID
  providerId: text("provider_id").notNull(), // Provider name (e.g., Google, GitHub)
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }), // Linked user
  accessToken: text("access_token"), // OAuth access token
  refreshToken: text("refresh_token"), // OAuth refresh token
  idToken: text("id_token"), // Optional ID token
  accessTokenExpiresAt: timestamp("access_token_expires_at"), // Expiry of access token
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"), // Expiry of refresh token
  scope: text("scope"), // OAuth scopes
  password: text("password"), // Optional: if storing hashed password
  createdAt: timestamp("created_at").notNull(), // Record creation time
  updatedAt: timestamp("updated_at").notNull(), // Last update time
});

// Verification table (e.g., for email or password reset codes)
export const verification = pgTable("verification", {
  id: text("id").primaryKey(), // Unique ID for verification record
  identifier: text("identifier").notNull(), // Email or username being verified
  value: text("value").notNull(), // Verification code or token
  expiresAt: timestamp("expires_at").notNull(), // Expiry of code
  createdAt: timestamp("created_at").$defaultFn(() => new Date()), // Creation timestamp
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()), // Last update timestamp
});

export const agents = pgTable("agents", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  instructions: text("instructions").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const meetingStatus = pgEnum("meeting_status", [
  "upcoming",
  "active",
  "completed",
  "processing",
  "cancelled",
]);

export const meetings = pgTable("meetings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  agentId: text("agent_id")
    .notNull()
    .references(() => agents.id, { onDelete: "cascade" }),
  status: meetingStatus("status").notNull().default("upcoming"),
  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),
  transcriptUrl: text("transcript_url"),
  recordingUrl: text("recording_url"),
  summary:text("summary"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
