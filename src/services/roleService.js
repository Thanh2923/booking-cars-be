const Role = require('../models/role'); // Đường dẫn tới file model Role

const createRole = async (data) => {
    const role = new Role(data);
    return await role.save();
};

const getAllRoles = async () => {
    return await Role.find();
};

const getRoleById = async (id) => {
    return await Role.findById(id);
};


const getRoleNameById = async (id) => {
    return await Role.findById(id);
};

const updateRole = async (id, data) => {
    return await Role.findByIdAndUpdate(id, data, { new: true });
};

const deleteRole = async (id) => {
    return await Role.findByIdAndDelete(id);
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
    getRoleNameById
};