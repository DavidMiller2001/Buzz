// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `buzz_${name}`);

export const users = createTable("users", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }).notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  messages: many(messages),
  usersToChatRooms: many(usersToChatRooms),
}));

export const messages = createTable("messages", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  content: text("content", { length: 256 }).notNull(),
  authorId: int("authorId", { mode: "number" }),
  roomId: int("roomId", { mode: "number" }),
});

export const messageRelations = relations(messages, ({ one }) => ({
  author: one(users, {
    fields: [messages.authorId],
    references: [users.id],
  }),
  room: one(chatRooms, {
    fields: [messages.roomId],
    references: [chatRooms.id],
  }),
}));

export const chatRooms = createTable("chatRooms", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }).notNull(),
});

export const chatRoomRelations = relations(chatRooms, ({ many }) => ({
  messages: many(messages),
  usersToChatRooms: many(usersToChatRooms),
}));

export const usersToChatRooms = createTable("userToChatRooms", {
  userId: int("userId")
    .notNull()
    .references(() => users.id),
  roomId: int("roomId")
    .notNull()
    .references(() => chatRooms.id),
});

export const usersToChatRoomsRelations = relations(
  usersToChatRooms,
  ({ one }) => ({
    user: one(users, {
      fields: [usersToChatRooms.userId],
      references: [users.id],
    }),
    chatRoom: one(chatRooms, {
      fields: [usersToChatRooms.roomId],
      references: [chatRooms.id],
    }),
  }),
);
