CREATE TABLE `bookings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reference` text NOT NULL,
	`hostel_name` text NOT NULL,
	`full_name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text,
	`room_type` text NOT NULL,
	`gender` text NOT NULL,
	`move_in_date` text NOT NULL,
	`message` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bookings_reference_unique` ON `bookings` (`reference`);