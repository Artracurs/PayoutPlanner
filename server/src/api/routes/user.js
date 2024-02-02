const express = require('express');
const { authenticate } = require('../middlewares/auth');
const { roleCheck } = require('../middlewares/roleCheck');

const router = express.Router();

// route only for admins
router.get('/manage-users', authenticate, roleCheck(['admin']), (req, res) => {
  res.json({ message: "User management interface" });
});

router.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}`, role: req.user.role });
});

module.exports = router;