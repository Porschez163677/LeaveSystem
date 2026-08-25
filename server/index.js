const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Login: verify employeeid + password against tb_employee
app.post('/api/login', async (req, res) => {
  const { employeeid, password } = req.body;
  if (!employeeid || !password) {
    return res.status(400).json({ message: 'กรุณากรอกรหัสบุคลากรและรหัสผ่าน' });
  }

  const [rows] = await pool.query(
    'SELECT employeeid, fullname, managerid FROM tb_employee WHERE employeeid = ? AND password = ?',
    [employeeid, password]
  );

  if (rows.length === 0) {
    return res.status(401).json({ message: 'รหัสบุคลากรหรือรหัสผ่านไม่ถูกต้อง' });
  }

  res.json(rows[0]);
});

// Leave types for the leave request form's dropdown
app.get('/api/leavetypes', async (req, res) => {
  const [rows] = await pool.query('SELECT typeid, typename FROM tb_leavetype ORDER BY typeid');
  res.json(rows);
});

// Leave requests already submitted by one employee
app.get('/api/leaves/:employeeid', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT f.leaveid, DATE_FORMAT(f.leave_from_date, '%Y-%m-%d') AS leave_from_date,
            DATE_FORMAT(f.leave_to_date, '%Y-%m-%d') AS leave_to_date,
            f.typeid, t.typename, f.reason
     FROM tb_leaveform f
     LEFT JOIN tb_leavetype t ON t.typeid = f.typeid
     WHERE f.employeeid = ?
     ORDER BY f.leaveid DESC`,
    [req.params.employeeid]
  );
  res.json(rows);
});

// Submit a new leave request
app.post('/api/leave', async (req, res) => {
  const { employeeid, leave_from_date, leave_to_date, typeid, reason } = req.body;
  if (!employeeid || !leave_from_date || !leave_to_date || !typeid) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  const year = new Date(leave_from_date).getFullYear();
  const [[{ cnt }]] = await pool.query(
    'SELECT COUNT(*) AS cnt FROM tb_leaveform WHERE leaveid LIKE ?',
    [`${year}%`]
  );
  const leaveid = `${year}${String(cnt + 1).padStart(3, '0')}`;

  await pool.query(
    'INSERT INTO tb_leaveform (leaveid, leave_from_date, leave_to_date, employeeid, typeid, reason) VALUES (?, ?, ?, ?, ?, ?)',
    [leaveid, leave_from_date, leave_to_date, employeeid, typeid, reason || null]
  );

  res.status(201).json({ leaveid });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Leave API listening on http://localhost:${PORT}`));
