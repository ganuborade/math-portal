import 'dotenv/config';
import mysql from 'mysql2/promise';

// Configurable environment variables for MySQL (Supports all cloud providers)
const DB_HOST = process.env.MYSQLHOST || process.env.DB_HOST || 'localhost';
const DB_USER = process.env.MYSQLUSER || process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '';
const DB_NAME = process.env.MYSQLDATABASE || process.env.DB_NAME || 'mathur_giri_math_db';
const DB_PORT = process.env.MYSQLPORT || process.env.DB_PORT || 3306;

let pool = null;
let isMySqlConnected = false;

// Mock database store for zero-downtime execution if MySQL is offline
export const mockDb = {
  committee_members: [
    { id: 1, name: 'Borade Sir', role: 'President/Head', phone: '+91 0000000000', email: 'head@mathurgiri.org', bio: 'Head Sansthan Leader & Gotegaon Elder' }
  ],
  financial_records: [],
  events_and_banners: [],
  gallery_photos: [],
  announcements: [],
  sansthan_goals: {
    target_amount: 1500000,
    project_title: 'गर्भगृह राजस्थानी गुलाबी दगडी कोरीव काम व सुवर्ण कळस'
  }
};

export async function initDbConnection() {
  try {
    const connectionUri = process.env.MYSQL_URL || process.env.DATABASE_URL;
    if (connectionUri) {
      pool = mysql.createPool({
        uri: connectionUri,
        waitForConnections: true,
        connectionLimit: Number(process.env.DB_POOL_LIMIT || 10),
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000,
        ssl: process.env.DB_SSL === 'false' ? undefined : { rejectUnauthorized: false }
      });
    } else {
      pool = mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: Number(DB_PORT),
        waitForConnections: true,
        connectionLimit: Number(process.env.DB_POOL_LIMIT || 10),
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000,
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined
      });
    }
    
    // Quick test connection from pool
    const connection = await pool.getConnection();
    console.log('✅ Connected successfully to MySQL Database (High-Performance Connection Pool Active)');
    connection.release();
    isMySqlConnected = true;

    // Ensure database tables exist and support LONGTEXT images
    await setupDatabaseTables();
  } catch (error) {
    console.log('⚠️ MySQL Connection Notice:', error.message);
    console.log('⚡ Active mode: Using high-speed embedded data provider (MySQL schema available in database/schema.sql)');
    isMySqlConnected = false;
  }
}

async function setupDatabaseTables() {
  if (!pool || !isMySqlConnected) return;
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS committee_members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(120) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        avatar_url LONGTEXT,
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS financial_records (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        donor_or_purpose VARCHAR(255) NOT NULL,
        amount DECIMAL(12,2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        receipt_no VARCHAR(50) DEFAULT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS events_and_banners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255) DEFAULT NULL,
        event_type VARCHAR(100) NOT NULL,
        event_date DATETIME NOT NULL,
        location VARCHAR(255) DEFAULT 'Mathur Giri Maharaj Math Sansthan, Gotegaon',
        description TEXT NOT NULL,
        banner_image_url LONGTEXT,
        kirtankar_name VARCHAR(150) DEFAULT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS gallery_photos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        image_url LONGTEXT NOT NULL,
        caption TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS announcements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        priority VARCHAR(50) DEFAULT 'normal',
        author VARCHAR(150) DEFAULT NULL,
        date DATE NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Ensure columns are LONGTEXT to support Base64 uploaded images
    try { await pool.execute(`ALTER TABLE gallery_photos MODIFY COLUMN image_url LONGTEXT`); } catch (e) {}
    try { await pool.execute(`ALTER TABLE events_and_banners MODIFY COLUMN banner_image_url LONGTEXT`); } catch (e) {}

    console.log('✅ MySQL Database Schema verified & ready.');
  } catch (err) {
    console.log('Notice initializing MySQL tables:', err.message);
  }
}

export function getDbStatus() {
  return {
    isMySqlConnected,
    database: DB_NAME,
    host: DB_HOST,
    connectionPool: pool ? 'ACTIVE' : 'INACTIVE',
    mode: isMySqlConnected ? 'MySQL Connection Pool' : 'High-Speed In-Memory Provider'
  };
}

export async function query(sql, params) {
  if (isMySqlConnected && pool) {
    const [rows] = await pool.execute(sql, params);
    return rows;
  }
  return null;
}
