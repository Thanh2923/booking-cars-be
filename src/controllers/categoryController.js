const categoryService = require('../services/categoryService');

// Tạo danh mục mới
const createCategory = async (req, res) => {
    try {
        const data = req.body;
        const newCategory = await categoryService.createCategory(data);
        return res.status(201).json(newCategory);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Lấy tất cả danh mục
const getAllCategories = async (req, res) => {
    const { page , limit  } = req.query;
    try {
        const categories = await categoryService.getAllCategories(Number(page), Number(limit));
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await categoryService.getCategoryById(id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Cập nhật danh mục
const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category_name = req.body;
        console.log(id,category_name)
        const updatedCategory = await categoryService.updateCategory(id,category_name);
        if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
        return res.status(200).json(updatedCategory);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Xóa danh mục
const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const deletedCategory = await categoryService.deleteCategory(id);
        if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
        return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
