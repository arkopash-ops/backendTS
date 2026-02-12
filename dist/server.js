"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend Connected."
    });
});
let users = [
    { _id: 1, name: "Abhi" },
    { _id: 2, name: "Mohit" }
];
// user routes
// Create new User
app.post("/addUsers", (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Name is required and must be a non-empty string"
        });
    }
    const newUser = {
        _id: users.length + 1,
        name: name.trim()
    };
    users.push(newUser);
    return res.status(201).json({
        success: true,
        message: `User ${newUser.name} created with ID: ${newUser._id}!`,
        user: newUser
    });
});
// Get all Users
app.get("/getUsers", (req, res) => {
    if (users.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No users found",
            users: []
        });
    }
    return res.status(200).json({
        success: true,
        users
    });
});
// Delete User by ID
app.delete("/deleteUser/:id", (req, res) => {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID"
        });
    }
    const userExists = users.some(u => u._id === userId);
    if (!userExists) {
        return res.status(404).json({
            success: false,
            message: `User with ID ${userId} not found`
        });
    }
    users = users.filter(u => u._id !== userId);
    return res.status(200).json({
        success: true,
        message: `User with ID ${userId} deleted permanently!`
    });
});
// Search User by name
app.get("/searchUser", (req, res) => {
    const name = req.query.name?.toString().toLowerCase() || "";
    const searchUser = users.filter(u => u.name.toLowerCase().includes(name));
    if (searchUser.length === 0) {
        return res.status(404).json({
            success: false,
            message: `No user found matching string: ${name}`
        });
    }
    return res.status(200).json({
        success: true,
        message: `Found user matching string: ${name}`,
        users: searchUser
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
//# sourceMappingURL=server.js.map