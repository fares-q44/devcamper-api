const express = require('express');
const { protect } = require('../middleware/auth');

const {
  register,
  login,
  getMe,
  updateDetails,
  forgotPassword,
  resetPassword,

  updatePassword,
  logout,
} = require('../controllers/auth');
const router = express.Router();

router.post('/register', register);
router.get('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', protect, logout);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
