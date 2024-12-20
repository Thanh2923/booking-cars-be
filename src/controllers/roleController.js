const roleService = require("../services/roleService");

// Tạo vai trò mới
const createRole = async (req, res) => {
  try {
    const data = req.body;
    const newRole = await roleService.createRole(data);
    return res.status(201).json(newRole);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả vai trò
const getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy vai trò theo ID
const getRoleById = async (req, res) => {
  try {
    const id = req.params.id;
    const role = await roleService.getRoleById(id);
    if (!role) return res.status(404).json({ message: "Role not found" });
    return res.status(200).json(role);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getRoleNameById = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await roleService.getRoleNameById(id);
        if (!role) return res.status(404).json({ message: 'Role not found' });
        return res.status(200).json(role);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Cập nhật vai trò
const updateRole = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedRole = await roleService.updateRole(id, data);
    if (!updatedRole)
      return res.status(404).json({ message: "Role not found" });
    return res.status(200).json(updatedRole);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Xóa vai trò
const deleteRole = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedRole = await roleService.deleteRole(id);
    if (!deletedRole)
      return res.status(404).json({ message: "Role not found" });
    return res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {

    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
    getRoleNameById
 
};
