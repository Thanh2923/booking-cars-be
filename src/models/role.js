const mongoose = require('mongoose');

// Định nghĩa schema cho Role
const roleSchema = new mongoose.Schema({
    roleName: { 
        type: String, 
        required: true,
        unique: true,
    }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
