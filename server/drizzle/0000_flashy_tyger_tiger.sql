CREATE TABLE `retailer_emails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`is_Verified` boolean DEFAULT false,
	`user_id` int,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `retailer_emails_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_emails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`is_Verified` boolean DEFAULT false,
	`user_id` int,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_emails_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `img_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`img` varchar(990) NOT NULL,
	`product_id` int,
	CONSTRAINT `img_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`article` varchar(255) NOT NULL,
	`artical_Id` varchar(255),
	`price` int NOT NULL,
	`in_Stock` int NOT NULL,
	`categorie` varchar(255) NOT NULL,
	`description` varchar(1000) DEFAULT '',
	`seller_name` varchar(255) NOT NULL,
	`seller_id` int NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `retailer` (
	`id` int AUTO_INCREMENT NOT NULL,
	`company_name` varchar(255),
	`name` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`state` varchar(255) NOT NULL,
	`address` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(10) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `retailer_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`session_id` int AUTO_INCREMENT NOT NULL,
	`userid` int NOT NULL,
	`token` varchar(500) NOT NULL,
	`ip_address` varchar(45) DEFAULT '',
	`user_agent` varchar(500) DEFAULT '',
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `session_session_id` PRIMARY KEY(`session_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `retailer_emails` ADD CONSTRAINT `retailer_emails_user_id_retailer_id_fk` FOREIGN KEY (`user_id`) REFERENCES `retailer`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_emails` ADD CONSTRAINT `user_emails_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `img_table` ADD CONSTRAINT `img_table_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_seller_id_retailer_id_fk` FOREIGN KEY (`seller_id`) REFERENCES `retailer`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_userid_users_id_fk` FOREIGN KEY (`userid`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;