-- ==============================================================================
-- DATABASE SCHEMA: Mathur Giri Maharaj Math Sansthan Gotegaon
-- Database Engine: MySQL / MariaDB (Cloud & Deployment Ready)
-- ==============================================================================


-- ------------------------------------------------------------------------------
-- 1. COMMITTEE MEMBERS TABLE (5 Core Roles)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `committee_members`;
CREATE TABLE `committee_members` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `role` ENUM('President/Head', 'Vice-President', 'Manager', 'Treasurer', 'Event Leader') NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(120) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `avatar_url` VARCHAR(255) DEFAULT NULL,
  `bio` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed 1 Initial President Committee Member (Default password: admin123hashed)
INSERT INTO `committee_members` (`name`, `role`, `phone`, `email`, `password_hash`, `bio`) VALUES
('बोराडे सर', 'President/Head', '+91 9000000000', 'head@mathurgiri.org', '$2a$10$wT.eKk7E7iVfN6c1a8L9U.vV7n9y0l8k7m6n5b4v3c2x1z', 'Head Sansthan Leader & Gotegaon Village Elder');

-- ------------------------------------------------------------------------------
-- 2. FINANCIAL RECORDS TABLE
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `financial_records`;
CREATE TABLE `financial_records` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `type` ENUM('collection', 'expense') NOT NULL,
  `donor_or_purpose` VARCHAR(255) NOT NULL,
  `amount` DECIMAL(12,2) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `date` DATE NOT NULL,
  `receipt_no` VARCHAR(50) DEFAULT NULL,
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------------------------
-- 3. CULTURAL EVENTS & BANNERS TABLE
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `events_and_banners`;
CREATE TABLE `events_and_banners` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(255) DEFAULT NULL,
  `event_type` VARCHAR(100) NOT NULL,
  `event_date` DATETIME NOT NULL,
  `location` VARCHAR(255) DEFAULT 'Mathur Giri Maharaj Math Sansthan, Gotegaon, Tal. Kaij, Dist. Beed',
  `description` TEXT NOT NULL,
  `banner_image_url` LONGTEXT,
  `kirtankar_name` VARCHAR(150) DEFAULT NULL,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------------------------
-- 4. GALLERY PHOTOS TABLE
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `gallery_photos`;
CREATE TABLE `gallery_photos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `image_url` LONGTEXT NOT NULL,
  `caption` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
