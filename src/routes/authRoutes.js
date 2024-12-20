const express = require('express');
const authController = require('../controllers/authController');
// const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users', authController.getAllUser);
router.get('/users/:id', authController.getUserById);

// Cập nhật user
router.put('/users/:id', authController.updateUser);
router.post('/users', authController.addUser);

// Xóa user
router.delete('/users/:id', authController.deleteUser);

module.exports = router;
