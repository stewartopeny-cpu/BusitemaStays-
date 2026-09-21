CREATE TABLE `partner_leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`hostel_name` text NOT NULL,
	`manager_name` text NOT NULL,
	`phone` text NOT NULL,
	`plan` text NOT NULL,
	`rooms` text,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
