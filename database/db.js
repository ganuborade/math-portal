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
    { id: 1, name: 'Shri Mahadevrao Patil', role: 'President/Head', phone: '+91 98230 11223', email: 'head@mathurgiri.org', bio: 'Head Sansthan Leader & Gotegaon Village Elder' },
    { id: 2, name: 'Shri Ramchandra Giri', role: 'Vice-President', phone: '+91 98230 22334', email: 'vice@mathurgiri.org', bio: 'Math Tradition Overseer & Cultural Guidance' },
    { id: 3, name: 'Shri Eknathrao Deshmukh', role: 'Manager', phone: '+91 98230 33445', email: 'manager@mathurgiri.org', bio: 'Daily Operations & Construction Management' },
    { id: 4, name: 'Shri Dnyaneshwar Shinde', role: 'Treasurer', phone: '+91 98230 44556', email: 'treasurer@mathurgiri.org', bio: 'Voluntary Fund Collections & Auditor' },
    { id: 5, name: 'Shri Sopanrao Jadhav', role: 'Event Leader', phone: '+91 98230 55667', email: 'events@mathurgiri.org', bio: 'Jayanti, Punyatithi & Kirtan Coordinator' }
  ],
  financial_records: [
    { id: 1, type: 'collection', donor_or_purpose: 'Gotegaon Villagers Batch 1 Contribution', amount: 450000.00, category: 'Village Contribution', date: '2026-01-10', receipt_no: 'REC-001', notes: 'Voluntary contribution collected from 120 households' },
    { id: 2, type: 'collection', donor_or_purpose: 'Gotegaon Villagers Batch 2 Contribution', amount: 380000.00, category: 'Village Contribution', date: '2026-02-15', receipt_no: 'REC-002', notes: 'Youth association & farmers collective donation' },
    { id: 3, type: 'collection', donor_or_purpose: 'Shri Vittalrao Patil & Family', amount: 100000.00, category: 'Devotee Seva', date: '2026-03-01', receipt_no: 'REC-003', notes: 'Sanctum Marble Donation' },
    { id: 4, type: 'collection', donor_or_purpose: 'NRI Devotees Collective Gotegaon', amount: 250000.00, category: 'Devotee Seva', date: '2026-04-12', receipt_no: 'REC-004', notes: 'Temple Spire (Kalash) Fund' },
    { id: 5, type: 'expense', donor_or_purpose: 'Main Temple Foundation & RCC Pillar Structure', amount: 520000.00, category: 'Construction Material', date: '2026-02-20', receipt_no: 'EXP-101', notes: 'Cement, Steel bars, and Earth excavation work' },
    { id: 6, type: 'expense', donor_or_purpose: 'Sanctum Sanctorum Rajasthani Pink Stone Work', amount: 340000.00, category: 'Artisans & Carving', date: '2026-03-25', receipt_no: 'EXP-102', notes: 'Handcrafted stone carving by traditional artisans' },
    { id: 7, type: 'expense', donor_or_purpose: 'Shri Mathur Giri Maharaj Jayanti Bhandara', amount: 85000.00, category: 'Cultural Event', date: '2026-05-10', receipt_no: 'EXP-103', notes: 'Food grains & Mahaprasad for 3,500 devotees' },
    { id: 8, type: 'expense', donor_or_purpose: 'Sound System & Illumination Lighting', amount: 65000.00, category: 'Electrical & Audio', date: '2026-06-05', receipt_no: 'EXP-104', notes: 'Haripath audio system & LED lights' }
  ],
  events_and_banners: [
    {
      id: 1,
      title: 'Shri Mathur Giri Maharaj Jayanti Mahotsav',
      subtitle: 'Grand Annual Birth Anniversary Celebration & Mahaprasad',
      event_type: 'Jayanti Mahotsav',
      event_date: '2026-09-15 06:00:00',
      location: 'Mathur Giri Maharaj Math Sansthan, Gotegaon',
      description: 'Annual grand celebration featuring Kakad Aarti, Akhand Haripath, Kirtan by renowned Maharaj, and Mahaprasad for all villagers and visiting devotees.',
      banner_image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      kirtankar_name: 'H.B.P. Prakash Maharaj',
      is_active: true
    },
    {
      id: 2,
      title: 'Shri Mathur Giri Maharaj Punyatithi Smaran Day',
      subtitle: 'Sacred Memorial Day, Bhajan & Deepotsav',
      event_type: 'Punyatithi',
      event_date: '2026-11-20 07:00:00',
      location: 'Mathur Giri Maharaj Math Sansthan, Gotegaon',
      description: 'Commemorating the sacred day of our revered Saint Shri Mathur Giri Maharaj with 24-hour Naamsmaran, Samaradhana, and evening 1,008 oil lamps Deepotsav.',
      banner_image_url: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
      kirtankar_name: 'H.B.P. Eknath Maharaj Gotegaonkar',
      is_active: true
    },
    {
      id: 3,
      title: 'Ashadhi Ekadashi Vitthal Kirtan & Dindi Sohala',
      subtitle: 'Traditional Maharashtrian Dindi & Bhandara',
      event_type: 'Utsav',
      event_date: '2026-07-20 05:00:00',
      location: 'Gotegaon Village & Math Sansthan',
      description: 'Special Vitthal Abhang Gatha, Dindi procession through Gotegaon village, and community Bhandara.',
      banner_image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
      kirtankar_name: 'Local Warkari Mandali',
      is_active: true
    }
  ],
  gallery_photos: [
    {
      id: 1,
      title: 'Historical Old Mathur Giri Math',
      category: 'Old Math & Maharaj',
      image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
      caption: 'The ancestral wooden math structure where Shri Mathur Giri Maharaj gave spiritual sermons for decades.'
    },
    {
      id: 2,
      title: 'Late Shri Mathur Giri Maharaj Sacred Portrait',
      category: 'Old Math & Maharaj',
      image_url: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1000&q=80',
      caption: 'Revered Saint Shri Mathur Giri Maharaj in serene sanyasi attire, blessing all devotees.'
    },
    {
      id: 3,
      title: 'Gotegaon Villagers Foundation Laying Ceremony',
      category: 'Construction Phase',
      image_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80',
      caption: 'Entire village assembling together to place the first sacred brick for the new math without government funds.'
    },
    {
      id: 4,
      title: 'Stone Carving Work by Local Artisans',
      category: 'Construction Phase',
      image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
      caption: 'Craftsmen sculpting intricate traditional Maharashtrian motifs on pink sandstone.'
    },
    {
      id: 5,
      title: 'Grand New Mathur Giri Maharaj Math Sansthan',
      category: 'New Temple View',
      image_url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
      caption: 'The newly constructed grand temple edifice with soaring golden Kalash and spacious hall.'
    },
    {
      id: 6,
      title: 'Sanctum Sanctorum Vitthal Rakhumai Idols',
      category: 'New Temple View',
      image_url: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1000&q=80',
      caption: 'Magnificent black marble idols of Lord Panduranga Vitthal & Goddess Rakhumai in the inner sanctum.'
    },
    {
      id: 7,
      title: 'Jayanti Mahotsav Bhajan & Kirtan Gathering',
      category: 'Cultural Events',
      image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
      caption: 'Devotees playing Taal and singing Haripath during the annual Jayanti utsav in Gotegaon.'
    }
  ],
  announcements: [
    {
      id: 1,
      title: 'श्री मथुरा गिरी महाराज जयंती महोत्सवाचे निमंत्रण व ग्रामस्थ बैठक',
      message: 'समस्त गोटेगाव ग्रामस्थ व भाविकांना कळविण्यात येते की आगामी भव्य जयंती महोत्सवाच्या नियोजनासाठी रविवारी सायंकाळी ७ वाजता मठात बैठकीचे आयोजन केले आहे.',
      priority: 'high',
      author: 'अध्यक्ष: श्री महादेवराव पाटील',
      date: '2026-08-19',
      is_active: true
    }
  ],
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
  } catch (error) {
    console.log('⚠️ MySQL Connection Notice:', error.message);
    console.log('⚡ Active mode: Using high-speed embedded data provider (MySQL schema available in database/schema.sql)');
    isMySqlConnected = false;
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
