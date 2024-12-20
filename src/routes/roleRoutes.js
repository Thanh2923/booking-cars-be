const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Routes CRUD cho Role
router.post('/', roleController.createRole); // Tạo vai trò mới
router.get('/', roleController.getAllRoles); // Lấy tất cả vai trò
router.get('/:id', roleController.getRoleById); // Lấy vai trò theo ID
router.put('/:id', roleController.updateRole); // Cập nhật vai trò
router.delete('/:id', roleController.deleteRole); // Xóa vai trò
module.exports = router;
