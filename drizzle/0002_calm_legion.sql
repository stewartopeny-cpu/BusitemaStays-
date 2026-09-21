CREATE TABLE `hostel_edits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`payload` text DEFAULT '{}' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`updated_by` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `hostel_edits_name_unique` ON `hostel_edits` (`name`);--> statement-breakpoint
CREATE TABLE `manager_accounts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`display_name` text NOT NULL,
	`hostel_name` text,
	`role` text DEFAULT 'manager' NOT NULL,
	`password_hash` text NOT NULL,
	`password_salt` text NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `manager_accounts_username_unique` ON `manager_accounts` (`username`);