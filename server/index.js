import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { generateToken, authMiddleware } from './middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const UPLOADS_DIR = join(__dirname, '..', 'public', 'uploads');

if (!existsSync(UPLOADS_DIR)) mkdirSync(UPLOADS_DIR, { recursive: true });

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

function readJSON(filename) {
  return JSON.parse(readFileSync(join(DATA_DIR, filename), 'utf-8'));
}
function writeJSON(filename, data) {
  writeFileSync(join(DATA_DIR, filename), JSON.stringify(data, null, 2), 'utf-8');
}

// ─── Auth ───────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const users = readJSON('users.json');
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Kullanıcı bulunamadı' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Geçersiz şifre' });

  const token = generateToken(user);
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

app.post('/api/auth/setup', async (req, res) => {
  const users = readJSON('users.json');
  const hasAdmin = users.some(u => u.role === 'admin' && !u.password.includes('Q8Q8Q'));
  if (hasAdmin) return res.status(400).json({ error: 'Admin zaten kurulmuş' });

  const { username, password } = req.body;
  if (!username || !password || password.length < 6) {
    return res.status(400).json({ error: 'Kullanıcı adı ve en az 6 karakter şifre gerekli' });
  }

  const hash = await bcrypt.hash(password, 10);
  const newUsers = [{ id: '1', username, password: hash, role: 'admin' }];
  writeJSON('users.json', newUsers);

  const token = generateToken(newUsers[0]);
  res.json({ token, user: { id: '1', username, role: 'admin' } });
});

app.get('/api/auth/check-setup', (req, res) => {
  const users = readJSON('users.json');
  const hasAdmin = users.some(u => u.role === 'admin' && !u.password.includes('Q8Q8Q'));
  res.json({ needsSetup: !hasAdmin });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// ─── Site Data (Public) ─────────────────────────────
app.get('/api/site', (req, res) => {
  const data = readJSON('site.json');
  res.json(data);
});

// ─── Site Data (Admin) ──────────────────────────────
app.get('/api/admin/site', authMiddleware, (req, res) => {
  const data = readJSON('site.json');
  res.json(data);
});

app.put('/api/admin/site', authMiddleware, (req, res) => {
  writeJSON('site.json', req.body);
  res.json({ success: true });
});

app.patch('/api/admin/site/:section', authMiddleware, (req, res) => {
  const data = readJSON('site.json');
  data[req.params.section] = req.body;
  writeJSON('site.json', data);
  res.json({ success: true });
});

// ─── Translations (Admin) ───────────────────────────
app.get('/api/admin/translations', authMiddleware, (req, res) => {
  const data = readJSON('translations.json');
  res.json(data);
});

app.put('/api/admin/translations', authMiddleware, (req, res) => {
  writeJSON('translations.json', req.body);
  res.json({ success: true });
});

app.patch('/api/admin/translations/:lang', authMiddleware, (req, res) => {
  const data = readJSON('translations.json');
  data[req.params.lang] = { ...data[req.params.lang], ...req.body };
  writeJSON('translations.json', data);
  res.json({ success: true });
});

// ─── Upload ─────────────────────────────────────────
app.post('/api/admin/upload', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Dosya gerekli' });
  res.json({ url: `/uploads/${req.file.filename}`, filename: req.file.filename });
});

app.post('/api/admin/upload/gallery', authMiddleware, upload.array('files', 20), (req, res) => {
  if (!req.files?.length) return res.status(400).json({ error: 'Dosya gerekli' });
  const urls = req.files.map(f => ({ url: `/uploads/${f.filename}`, filename: f.filename }));

  const data = readJSON('site.json');
  data.gallery = [...(data.gallery || []), ...urls.map(u => ({ id: Date.now().toString() + Math.random().toString(36).slice(2), url: u.url }))];
  writeJSON('site.json', data);

  res.json({ files: urls, gallery: data.gallery });
});

app.delete('/api/admin/gallery/:id', authMiddleware, (req, res) => {
  const data = readJSON('site.json');
  data.gallery = (data.gallery || []).filter(g => g.id !== req.params.id);
  writeJSON('site.json', data);
  res.json({ success: true });
});

// ─── Password Change ────────────────────────────────
app.put('/api/admin/password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'Yeni şifre en az 6 karakter olmalı' });
  }

  const users = readJSON('users.json');
  const user = users.find(u => u.id === req.user.id);
  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) return res.status(401).json({ error: 'Mevcut şifre yanlış' });

  user.password = await bcrypt.hash(newPassword, 10);
  writeJSON('users.json', users);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`SS Congress Admin API → http://localhost:${PORT}`));
