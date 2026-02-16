"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._addUserWithID = exports._deleteAllUsers = exports._searchUserByName = exports._deleteUserByID = exports._getAllUsers = exports._addUser = void 0;
const user_service_1 = require("../services/user.service");
const user_model_1 = require("../models/user.model");
// add users
const _addUser = (req, res) => {
    const { name } = req.body;
    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Invalid name provided. It must be a non-empty string."
        });
    }
    try {
        const user = (0, user_service_1.createUser)(name);
        return res.status(201).json({
            success: true,
            user
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports._addUser = _addUser;
// get all users
const _getAllUsers = (req, res) => {
    const users = (0, user_service_1.getAllUsers)();
    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No user found. Users list is Empty."
        });
    }
    return res.status(200).json({
        success: true,
        message: "Users retrived successfully.",
        users
    });
};
exports._getAllUsers = _getAllUsers;
// delete users by id
const _deleteUserByID = (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ success: false });
    }
    const deleted = (0, user_service_1.deleteUserByID)(id);
    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: `User with ID ${id} not found.`
        });
    }
    return res.status(200).json({
        success: true,
        message: `User with ID ${id} deleted successfully.`
    });
};
exports._deleteUserByID = _deleteUserByID;
// search user by name
const _searchUserByName = (req, res) => {
    const name = req.params.name?.toString().toLowerCase() || "";
    const searchedUser = (0, user_service_1.searchUserByName)(name);
    if (searchedUser.length === 0) {
        return res.status(404).json({
            success: false,
            message: `No user found matching string: ${name}`
        });
    }
    return res.status(200).json({
        success: true,
        message: `Found user matching string: ${name}`,
        users: searchedUser
    });
};
exports._searchUserByName = _searchUserByName;
// delete all users
const _deleteAllUsers = (req, res) => {
    const deleted = (0, user_service_1.deleteAllUsers)();
    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: "No user found to delete. Users list is already empty."
        });
    }
    return res.status(200).json({
        success: true,
        message: "All users are deleted successfully."
    });
};
exports._deleteAllUsers = _deleteAllUsers;
// add users with ID
const _addUserWithID = (req, res) => {
    const { id, name } = req.body;
    const numericId = Number(id);
    if (Number.isNaN(numericId) ||
        typeof name !== "string" ||
        name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID or name. ID must be a valid number and name must be a non-empty string."
        });
    }
    const existingUser = user_model_1.users.find(u => u._id === numericId);
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "ID is already used."
        });
    }
    const user = (0, user_service_1.createUserWithID)(numericId, name);
    return res.status(201).json({
        success: true,
        user
    });
};
exports._addUserWithID = _addUserWithID;
//# sourceMappingURL=user.controller.js.map