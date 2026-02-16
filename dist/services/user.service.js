"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserWithID = exports.deleteAllUsers = exports.searchUserByName = exports.deleteUserByID = exports.getAllUsers = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
// add users
const createUser = (name) => {
    const newUser = {
        _id: (0, user_model_1.generateID)(),
        name: name.trim()
    };
    user_model_1.users.push(newUser);
    return newUser;
};
exports.createUser = createUser;
// get all users
const getAllUsers = () => {
    return user_model_1.users;
};
exports.getAllUsers = getAllUsers;
// delete usrs by id
const deleteUserByID = (id) => {
    const index = user_model_1.users.findIndex(u => u._id === id);
    if (index === -1)
        return false;
    user_model_1.users.splice(index, 1);
    return true;
};
exports.deleteUserByID = deleteUserByID;
// search users by name
const searchUserByName = (name) => {
    const searchName = name.trim().toLowerCase();
    return user_model_1.users.filter(u => u.name.toLowerCase().includes(searchName));
};
exports.searchUserByName = searchUserByName;
// delete all users
const deleteAllUsers = () => {
    if (user_model_1.users.length === 0)
        return false;
    user_model_1.users.length = 0;
    return true;
};
exports.deleteAllUsers = deleteAllUsers;
// add users with ID
const createUserWithID = (id, name) => {
    const newUser = {
        _id: id,
        name: name.trim()
    };
    user_model_1.users.push(newUser);
    return newUser;
};
exports.createUserWithID = createUserWithID;
//# sourceMappingURL=user.service.js.map