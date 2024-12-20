const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Routes CRUD cho Category
router.post('/', categoryController.createCategory); // Tạo danh mục mới
router.get('/', categoryController.getAllCategories); // Lấy tất cả danh mục
router.get('/:id', categoryController.getCategoryById); // Lấy danh mục theo ID
router.put('/:id', categoryController.updateCategory); // Cập nhật danh mục
router.delete('/:id', categoryController.deleteCategory); // Xóa danh mục

module.exports = router;
