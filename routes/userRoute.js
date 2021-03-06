const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload')


const router = express.Router();


router.post('/register', authController.register)
router.post('/login', authController.login);
router.patch('/profile-img', authenticate, upload.single('profileImg'), userController.updateProfileImg)

module.exports = router; 