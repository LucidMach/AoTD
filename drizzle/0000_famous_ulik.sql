CREATE TABLE `adventures` (
	`created_at` text PRIMARY KEY DEFAULT strftime('%Y-%m-%dT%H:%M:%fZ', 'now') NOT NULL,
	`adventure` text NOT NULL,
	`boolean` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `memories` (
	`created_at` text PRIMARY KEY DEFAULT strftime('%Y-%m-%dT%H:%M:%fZ', 'now') NOT NULL,
	`memory` text NOT NULL
);
