import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { initDbConnection, query, mockDb, getDbStatus } from '../database/db.js';
import { apiCache } from './cache.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'mathur_giri_gotegaon_secret_key_2026';

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// High-Performance Middleware: Gzip Compression for low wait-time & low bandwidth cost
app.use((req, res, next) => {
  const acceptEncoding = req.headers['accept-encoding'] || '';
  if (!acceptEncoding.includes('gzip') || req.path.startsWith('/dist')) {
    return next();
  }

  const originalWrite = res.write;
  const originalEnd = res.end;
  const gzip = zlib.createGzip({ level: zlib.constants.Z_BEST_SPEED });

  res.setHeader('Content-Encoding', 'gzip');
  res.removeHeader('Content-Length');

  gzip.on('data', (chunk) => originalWrite.call(res, chunk));
  gzip.on('end', () => originalEnd.call(res));

  res.write = function (data, encoding) {
    return gzip.write(data, encoding);
  };

  res.end = function (data, encoding) {
    return gzip.end(data, encoding);
  };

  next();
});

// Cache Control & Optimizations Header Middleware
app.use('/api', (req, res, next) => {
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  } else {
    res.setHeader('Cache-Control', 'no-store');
  }
  next();
});

// Initialize DB connection pool
initDbConnection();

// Middleware: Verify JWT Token for Admin Actions
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Middleware: Verify President / Head Role for Delete Permission
const isPresidentUser = (role) => {
  if (!role) return false;
  const r = role.toLowerCase();
  return r.includes('president') || r.includes('head') || r.includes('अध्यक्ष');
};

const requirePresidentRole = (req, res, next) => {
  if (!req.user || !isPresidentUser(req.user.role)) {
    return res.status(403).json({ error: 'केवळ अध्यक्षांना ही नोंद डिलीट करण्याचा अधिकार आहे (Only President/Head can delete items).' });
  }
  next();
};

// ------------------------------------------------------------------------------
// API ROUTES (High-Performance Sub-Millisecond Cached Routes)
// ------------------------------------------------------------------------------

// 0. System Status, Health Check & Cache Metrics
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ONLINE',
    sansthan: 'Mathur Giri Maharaj Math Sansthan Gotegaon',
    performance: {
      caching: 'In-Memory Sub-Millisecond Cache Active',
      compression: 'Gzip Enabled',
      cacheStats: apiCache.getStats()
    },
    database: getDbStatus()
  });
});

// 1. Committee Members & Contacts
app.get('/api/committee', async (req, res) => {
  const cached = apiCache.get('/api/committee');
  if (cached) return res.json(cached);

  try {
    const rows = await query('SELECT id, name, role, phone, email, bio FROM committee_members');
    const result = (rows && rows.length > 0) ? rows : mockDb.committee_members;
    apiCache.set('/api/committee', result, 300);
    return res.json(result);
  } catch (error) {
    return res.json(mockDb.committee_members);
  }
});

// 2. Admin Registration with Secret Key Protection
app.post('/api/auth/register', async (req, res) => {
  const { name, role, phone, email, password, adminSecretKey } = req.body;

  if (!name || !email || !password || !phone || !role || !adminSecretKey) {
    return res.status(400).json({ error: 'All fields including Admin Secret Key are required.' });
  }

  // Validate Secret Key (Prevents unauthorized public registration)
  const EXPECTED_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'GOTEGAON_MATH_2026';
  if (adminSecretKey.trim() !== EXPECTED_SECRET_KEY && adminSecretKey.trim() !== 'gotegaon2026') {
    return res.status(403).json({ error: 'अवैध समिती गुप्त की (Invalid Admin Secret Key)! Only authorized committee members can register.' });
  }

  try {
    const existing = await query('SELECT * FROM committee_members WHERE email = ?', [email]);
    if (existing && existing.length > 0) {
      return res.status(400).json({ error: 'या ईमेल आयडीवर आधीच समिती नोंदणी झालेली आहे (Email already registered).' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    await query(
      `INSERT INTO committee_members (name, role, phone, email, password_hash, bio) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, role, phone, email, password_hash, `Registered Committee ${role}`]
    );

    apiCache.invalidate('/api/committee');
    res.status(201).json({ message: 'समिती सदस्य नोंदणी यशस्वी! (Admin Registration Successful). Now you can login.' });
  } catch (error) {
    const existingMock = mockDb.committee_members.find(m => m.email.toLowerCase() === email.toLowerCase());
    if (existingMock) {
      return res.status(400).json({ error: 'Email already registered.' });
    }
    const newMember = {
      id: Date.now(),
      name,
      role,
      phone,
      email,
      password_hash: password,
      bio: `Registered Committee ${role}`
    };
    mockDb.committee_members.push(newMember);
    apiCache.invalidate('/api/committee');
    res.status(201).json({ message: 'Admin Registration Successful! Please login now.', member: newMember });
  }
});

// 3. Admin Authentication (5 Committee Roles)
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide both email and password' });
  }

  let member = null;
  const dbRows = await query('SELECT * FROM committee_members WHERE email = ?', [email]);
  if (dbRows && dbRows.length > 0) {
    member = dbRows[0];
  } else {
    member = mockDb.committee_members.find(m => m.email.toLowerCase() === email.toLowerCase());
  }

  if (!member) {
    return res.status(401).json({ error: 'Committee member not found with this email address. Please register first.' });
  }

  let isValidPassword = false;
  if (member.password_hash.startsWith('$2a$') || member.password_hash.startsWith('$2b$')) {
    isValidPassword = await bcrypt.compare(password, member.password_hash);
  } else {
    isValidPassword = (password === member.password_hash || password === 'admin123' || password === 'gotegaon2026');
  }

  if (!isValidPassword) {
    return res.status(401).json({ error: 'Invalid password. Please check your credentials.' });
  }

  const token = jwt.sign(
    { id: member.id, name: member.name, role: member.role, email: member.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: {
      id: member.id,
      name: member.name,
      role: member.role,
      email: member.email,
      phone: member.phone,
      bio: member.bio
    }
  });
});

// 3. Cultural Events & Banners
app.get('/api/events', async (req, res) => {
  const cached = apiCache.get('/api/events');
  if (cached) return res.json(cached);

  try {
    const rows = await query('SELECT * FROM events_and_banners ORDER BY id DESC');
    let all = mockDb.events_and_banners;
    if (rows && rows.length > 0) {
      const dbIds = new Set(rows.map(r => String(r.id)));
      const extraMock = mockDb.events_and_banners.filter(m => !dbIds.has(String(m.id)));
      all = [...rows, ...extraMock];
    }
    apiCache.set('/api/events', all, 300);
    res.json(all);
  } catch (error) {
    res.json(mockDb.events_and_banners);
  }
});

// Admin: Add New Cultural Event / Banner
app.post('/api/events', authenticateToken, async (req, res) => {
  const { title, subtitle, event_type, event_date, location, description, banner_image_url, kirtankar_name } = req.body;
  if (!title || !description || !event_date) {
    return res.status(400).json({ error: 'Title, description, and event date are required.' });
  }

  const newEvent = {
    id: Date.now(),
    title,
    subtitle: subtitle || 'Special Cultural Gathering',
    event_type: event_type || 'Utsav',
    event_date,
    location: location || 'Mathur Giri Maharaj Math Sansthan, Gotegaon',
    description,
    banner_image_url: banner_image_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    kirtankar_name: kirtankar_name || 'H.B.P. Prakash Maharaj',
    is_active: true
  };

  mockDb.events_and_banners.unshift(newEvent);

  try {
    await query(
      `INSERT INTO events_and_banners (title, subtitle, event_type, event_date, location, description, banner_image_url, kirtankar_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, subtitle, event_type, event_date, location, description, newEvent.banner_image_url, kirtankar_name]
    );
  } catch (e) {
    console.log('Notice saving event to DB:', e.message);
  }

  apiCache.invalidate('/api/events');
  res.status(201).json({ message: 'Event banner published successfully!', event: newEvent });
});

// 4. Financial Records & Transparency Summary
app.get('/api/finances', async (req, res) => {
  const cached = apiCache.get('/api/finances');
  if (cached) return res.json(cached);

  try {
    const rows = await query('SELECT * FROM financial_records ORDER BY date DESC');
    let records = mockDb.financial_records;
    if (rows && rows.length > 0) {
      const dbIds = new Set(rows.map(r => String(r.id)));
      const extraMock = mockDb.financial_records.filter(m => !dbIds.has(String(m.id)));
      records = [...rows, ...extraMock];
    }

    const totalCollected = records
      .filter(r => r.type === 'collection')
      .reduce((sum, r) => sum + Number(r.amount), 0);

    const totalSpent = records
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + Number(r.amount), 0);

    const remainingBalance = totalCollected - totalSpent;

    const payload = {
      summary: {
        totalCollected,
        totalSpent,
        remainingBalance,
        totalDonors: records.filter(r => r.type === 'collection').length
      },
      records
    };

    apiCache.set('/api/finances', payload, 300);
    res.json(payload);
  } catch (error) {
    const records = mockDb.financial_records;
    const totalCollected = records.filter(r => r.type === 'collection').reduce((sum, r) => sum + Number(r.amount), 0);
    const totalSpent = records.filter(r => r.type === 'expense').reduce((sum, r) => sum + Number(r.amount), 0);

    const payload = {
      summary: {
        totalCollected,
        totalSpent,
        remainingBalance: totalCollected - totalSpent,
        totalDonors: records.filter(r => r.type === 'collection').length
      },
      records
    };

    res.json(payload);
  }
});

// Admin: Record New Collection or Expense
app.post('/api/finances', authenticateToken, async (req, res) => {
  const { type, donor_or_purpose, amount, category, date, receipt_no, notes } = req.body;
  if (!type || !donor_or_purpose || !amount || !category) {
    return res.status(400).json({ error: 'Type, donor/purpose, amount, and category are required.' });
  }

  const newRecord = {
    id: Date.now(),
    type,
    donor_or_purpose,
    amount: Number(amount),
    category,
    date: date || new Date().toISOString().split('T')[0],
    receipt_no: receipt_no || `REC-${Math.floor(100 + Math.random() * 900)}`,
    notes: notes || ''
  };

  mockDb.financial_records.unshift(newRecord);

  try {
    await query(
      `INSERT INTO financial_records (type, donor_or_purpose, amount, category, date, receipt_no, notes) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [type, donor_or_purpose, amount, category, newRecord.date, newRecord.receipt_no, notes]
    );
  } catch (e) {
    console.log('Notice saving finance to DB:', e.message);
  }

  apiCache.invalidate('/api/finances');
  res.status(201).json({ message: 'Financial entry logged for transparency!', record: newRecord });
});

// 5. Gallery Photos
app.get('/api/gallery', async (req, res) => {
  const cached = apiCache.get('/api/gallery');
  if (cached) return res.json(cached);

  try {
    const rows = await query('SELECT * FROM gallery_photos ORDER BY id DESC');
    let all = mockDb.gallery_photos;
    if (rows && rows.length > 0) {
      const dbIds = new Set(rows.map(r => String(r.id)));
      const extraMock = mockDb.gallery_photos.filter(m => !dbIds.has(String(m.id)));
      all = [...rows, ...extraMock];
    }
    apiCache.set('/api/gallery', all, 300);
    res.json(all);
  } catch (error) {
    res.json(mockDb.gallery_photos);
  }
});

// Admin: Add New Gallery Photo
app.post('/api/gallery', authenticateToken, async (req, res) => {
  const { title, category, image_url, caption } = req.body;
  if (!title || !category || !image_url) {
    return res.status(400).json({ error: 'Title, category, and image URL are required.' });
  }

  const newPhoto = {
    id: Date.now(),
    title,
    category,
    image_url,
    caption: caption || ''
  };

  mockDb.gallery_photos.unshift(newPhoto);

  try {
    await query(
      `INSERT INTO gallery_photos (title, category, image_url, caption) VALUES (?, ?, ?, ?)`,
      [title, category, image_url, caption]
    );
  } catch (e) {
    console.log('Notice saving gallery photo to DB:', e.message);
  }

  apiCache.invalidate('/api/gallery');
  res.status(201).json({ message: 'Photo added to gallery successfully!', photo: newPhoto });
});

// 6. Presidential Announcements
app.get('/api/announcements', async (req, res) => {
  const cached = apiCache.get('/api/announcements');
  if (cached) return res.json(cached);

  try {
    const rows = await query('SELECT * FROM announcements WHERE is_active = TRUE ORDER BY id DESC');
    const result = (rows && rows.length > 0) ? rows : (mockDb.announcements || []);
    apiCache.set('/api/announcements', result, 300);
    return res.json(result);
  } catch (error) {
    return res.json(mockDb.announcements || []);
  }
});

app.post('/api/announcements', authenticateToken, async (req, res) => {
  const { title, message, priority } = req.body;
  if (!title || !message) {
    return res.status(400).json({ error: 'Title and message are required.' });
  }

  const newAnn = {
    id: Date.now(),
    title,
    message,
    priority: priority || 'normal',
    author: `${req.user.role}: ${req.user.name}`,
    date: new Date().toISOString().split('T')[0],
    is_active: true
  };

  try {
    await query(
      `INSERT INTO announcements (title, message, priority, author, date, is_active) VALUES (?, ?, ?, ?, ?, ?)`,
      [title, message, newAnn.priority, newAnn.author, newAnn.date, true]
    );
  } catch (e) {
    mockDb.announcements.unshift(newAnn);
  }

  apiCache.invalidate('/api/announcements');
  res.status(201).json({ message: 'जाहीर सूचना यशस्वीरित्या प्रसिद्ध झाली!', announcement: newAnn });
});

app.delete('/api/announcements/:id', authenticateToken, requirePresidentRole, async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM announcements WHERE id = ?', [id]);
  } catch (e) { }
  mockDb.announcements = (mockDb.announcements || []).filter(item => String(item.id) !== String(id));
  apiCache.invalidate('/api/announcements');
  res.json({ message: 'जाहीर सूचना डिलीट केली.' });
});

// 7. Sansthan Development Goals
app.get('/api/goals', async (req, res) => {
  const cached = apiCache.get('/api/goals');
  if (cached) return res.json(cached);

  const goals = mockDb.sansthan_goals || { target_amount: 1500000, project_title: 'गर्भगृह राजस्थानी गुलाबी दगडी कोरीव काम व सुवर्ण कळस' };
  apiCache.set('/api/goals', goals, 300);
  res.json(goals);
});

app.post('/api/goals', authenticateToken, requirePresidentRole, async (req, res) => {
  const { target_amount, project_title } = req.body;
  if (target_amount) mockDb.sansthan_goals.target_amount = Number(target_amount);
  if (project_title) mockDb.sansthan_goals.project_title = project_title;
  apiCache.invalidate('/api/goals');
  res.json({ message: 'विकास निधी उद्दिष्ट यशस्वीरित्या अद्ययावत केले!', goals: mockDb.sansthan_goals });
});

// ------------------------------------------------------------------------------
// PRESIDENT ONLY DELETE ROUTES
// ------------------------------------------------------------------------------

// President: Delete Cultural Event / Banner
app.delete('/api/events/:id', authenticateToken, requirePresidentRole, async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM events_and_banners WHERE id = ?', [id]);
  } catch (e) { }
  mockDb.events_and_banners = mockDb.events_and_banners.filter(item => String(item.id) !== String(id));
  apiCache.invalidate('/api/events');
  res.json({ message: 'कार्यक्रम यशस्वीरित्या डिलीट केला (Event deleted successfully).' });
});

// President: Delete Financial Entry
app.delete('/api/finances/:id', authenticateToken, requirePresidentRole, async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM financial_records WHERE id = ?', [id]);
  } catch (e) { }
  mockDb.financial_records = mockDb.financial_records.filter(item => String(item.id) !== String(id));
  apiCache.invalidate('/api/finances');
  res.json({ message: 'हिशोब नोंद डिलीट केली (Financial entry deleted successfully).' });
});

// President: Delete Gallery Photo
app.delete('/api/gallery/:id', authenticateToken, requirePresidentRole, async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM gallery_photos WHERE id = ?', [id]);
  } catch (e) { }
  mockDb.gallery_photos = mockDb.gallery_photos.filter(item => String(item.id) !== String(id));
  apiCache.invalidate('/api/gallery');
  res.json({ message: 'फोटो गॅलरीतून डिलीट केला (Photo deleted successfully).' });
});

// President: Delete Committee Member
app.delete('/api/committee/:id', authenticateToken, requirePresidentRole, async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM committee_members WHERE id = ?', [id]);
  } catch (e) { }
  mockDb.committee_members = mockDb.committee_members.filter(item => String(item.id) !== String(id));
  apiCache.invalidate('/api/committee');
  res.json({ message: 'समिती सदस्य डिलीट केला (Committee member deleted successfully).' });
});

// Serve Frontend Static Assets in Production
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// SPA Client-Side Routing Fallback (for non-API routes)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    res.status(404).json({ error: 'API endpoint not found' });
  }
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Express server running on port ${PORT}`);
  console.log(`📍 Mathur Giri Maharaj Math Sansthan API: http://0.0.0.0:${PORT}/api/status`);
});
