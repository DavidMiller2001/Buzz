CREATE TABLE `buzz_chatRooms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `buzz_messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text(256) NOT NULL,
	`authorId` integer,
	`roomId` integer,
	FOREIGN KEY (`authorId`) REFERENCES `buzz_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`roomId`) REFERENCES `buzz_chatRooms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `buzz_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256) NOT NULL
);
