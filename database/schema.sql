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

-- Seed 5 Core Committee Members (Default password: admin123hashed)
INSERT INTO `committee_members` (`name`, `role`, `phone`, `email`, `password_hash`, `bio`) VALUES
('Shri Mahadevrao Patil', 'President/Head', '+91 98230 11223', 'head@mathurgiri.org', '$2a$10$wT.eKk7E7iVfN6c1a8L9U.vV7n9y0l8k7m6n5b4v3c2x1z', 'Head Sansthan Leader & Gotegaon Village Elder'),
('Shri Ramchandra Giri', 'Vice-President', '+91 98230 22334', 'vice@mathurgiri.org', '$2a$10$wT.eKk7E7iVfN6c1a8L9U.vV7n9y0l8k7m6n5b4v3c2x1z', 'Math Tradition Overseer & Cultural Guidance'),
('Shri Eknathrao Deshmukh', 'Manager', '+91 98230 33445', 'manager@mathurgiri.org', '$2a$10$wT.eKk7E7iVfN6c1a8L9U.vV7n9y0l8k7m6n5b4v3c2x1z', 'Daily Operations & Construction Project Management'),
('Shri Dnyaneshwar Shinde', 'Treasurer', '+91 98230 44556', 'treasurer@mathurgiri.org', '$2a$10$wT.eKk7E7iVfN6c1a8L9U.vV7n9y0l8k7m6n5b4v3c2x1z', 'Voluntary Fund Collections & Expense Auditor'),
('Shri Sopanrao Jadhav', 'Event Leader', '+91 98230 55667', 'events@mathurgiri.org', '$2a$10$wT.eKk7E7iVfN6c1a8L9U.vV7n9y0l8k7m6n5b4v3c2x1z', 'Jayanti, Punyatithi & Kirtan Mahotsav Coordinator');

-- ------------------------------------------------------------------------------
-- 2. FINANCIAL RECORDS TABLE (Voluntary Collections & Construction Expenses)
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

-- Seed Sample Financial Data for Public Transparency
INSERT INTO `financial_records` (`type`, `donor_or_purpose`, `amount`, `category`, `date`, `receipt_no`, `notes`) VALUES
('collection', 'Gotegaon Villagers Batch 1 Contribution', 450000.00, 'Village Contribution', '2026-01-10', 'REC-001', 'Voluntary contribution collected from 120 households'),
('collection', 'Gotegaon Villagers Batch 2 Contribution', 380000.00, 'Village Contribution', '2026-02-15', 'REC-002', 'Youth association & farmers collective donation'),
('collection', 'Shri Vittalrao Patil & Family', 100000.00, 'Devotee Seva', '2026-03-01', 'REC-003', 'Sanctum Marble Donation'),
('collection', 'NRI Devotees Collective Gotegaon', 250000.00, 'Devotee Seva', '2026-04-12', 'REC-004', 'Temple Spire (Kalash) Fund'),
('expense', 'Main Temple Foundation & RCC Pillar Structure', 520000.00, 'Construction Material', '2026-02-20', 'EXP-101', 'Cement, Steel bars, and Earth excavation work'),
('expense', 'Sanctum Sanctorum Rajasthani Pink Stone Work', 340000.00, 'Artisans & Carving', '2026-03-25', 'EXP-102', 'Handcrafted stone carving by traditional artisans'),
('expense', 'Shri Mathur Giri Maharaj Jayanti Bhandara & Annadan', 85000.00, 'Cultural Event', '2026-05-10', 'EXP-103', 'Food grains & Mahaprasad for 3,500 devotees'),
('expense', 'Sound System & Temple Illumination Lighting', 65000.00, 'Electrical & Audio', '2026-06-05', 'EXP-104', 'Haripath audio system & LED decorative lights');

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
  `location` VARCHAR(255) DEFAULT 'Mathur Giri Maharaj Math Sansthan, Gotegaon',
  `description` TEXT NOT NULL,
  `banner_image_url` LONGTEXT,
  `kirtankar_name` VARCHAR(150) DEFAULT NULL,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Cultural Events
INSERT INTO `events_and_banners` (`title`, `subtitle`, `event_type`, `event_date`, `description`, `kirtankar_name`, `is_active`) VALUES
('Shri Mathur Giri Maharaj Jayanti Mahotsav', 'Grand Annual Birth Anniversary Celebration & Mahaprasad', 'Jayanti Mahotsav', '2026-09-15 06:00:00', 'Annual grand celebration featuring Kakad Aarti, Akhand Haripath, Kirtan by renowned Maharaj, and Mahaprasad for all villagers and visiting devotees.', 'H.B.P. Prakash Maharaj', TRUE),
('Shri Mathur Giri Maharaj Punyatithi Smaran Day', 'Sacred Memorial Day, Bhajan & Deepotsav', 'Punyatithi', '2026-11-20 07:00:00', 'Commemorating the sacred day of our revered Saint Shri Mathur Giri Maharaj with 24-hour Naamsmaran, Samaradhana, and evening 1,008 oil lamps Deepotsav.', 'H.B.P. Eknath Maharaj Gotegaonkar', TRUE),
('Ashadhi Ekadashi Vitthal Kirtan & Dindi Sohala', 'Traditional Maharashtrian Dindi & Bhandara', 'Utsav', '2026-07-20 05:00:00', 'Special Vitthal Abhang Gatha, Dindi procession through Gotegaon village, and community Bhandara.', 'Local Warkari Mandali', TRUE);

-- ------------------------------------------------------------------------------
-- 4. GALLERY PHOTOS TABLE (Old Math, Maharaj Photos, New Math, Events)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `gallery_photos`;
CREATE TABLE `gallery_photos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` ENUM('Old Math & Maharaj', 'Construction Phase', 'New Temple View', 'Cultural Events') NOT NULL,
  `image_url` LONGTEXT NOT NULL,
  `caption` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Sample Gallery Records
INSERT INTO `gallery_photos` (`title`, `category`, `image_url`, `caption`) VALUES
('Historical Old Mathur Giri Math', 'Old Math & Maharaj', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80', 'The ancestral wooden math structure where Shri Mathur Giri Maharaj gave spiritual sermons for decades.'),
('Late Shri Mathur Giri Maharaj Sacred Portrait', 'Old Math & Maharaj', 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1000&q=80', 'Revered Saint Shri Mathur Giri Maharaj in serene sanyasi attire, blessing all devotees.'),
('Gotegaon Villagers Foundation Laying Ceremony', 'Construction Phase', 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80', 'Entire village assembling together to place the first sacred brick for the new math without government funds.'),
('Stone Carving Work by Local Artisans', 'Construction Phase', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80', 'Craftsmen sculpting intricate traditional Maharashtrian motifs on pink sandstone.'),
('Grand New Mathur Giri Maharaj Math Sansthan', 'New Temple View', 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80', 'The newly constructed grand temple edifice with soaring golden Kalash and spacious hall.'),
('Sanctum Sanctorum Vitthal Rakhumai Idols', 'New Temple View', 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1000&q=80', 'Magnificent black marble idols of Lord Panduranga Vitthal & Goddess Rakhumai in the inner sanctum.'),
('Jayanti Mahotsav Bhajan & Kirtan Gathering', 'Cultural Events', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80', 'Devotees playing Taal and singing Haripath during the annual Jayanti उत्सव in Gotegaon.');
