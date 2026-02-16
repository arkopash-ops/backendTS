import { Request, Response } from "express";
import {
    createUser,
    getAllUsers,
    deleteUserByID,
    searchUserByName,
    deleteAllUsers,
    createUserWithID
} from "../services/user.service";
import { users } from "../models/user.model";

// add users
export const _addUser = (req: Request, res: Response) => {
    const { name } = req.body;

    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Invalid name provided. It must be a non-empty string."
        });
    }

    try {
        const user = createUser(name);

        return res.status(201).json({
            success: true,
            user
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// get all users
export const _getAllUsers = (req: Request, res: Response) => {
    const users = getAllUsers();

    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No user found. Users list is Empty."
        })
    }

    return res.status(200).json({
        success: true,
        message: "Users retrived successfully.",
        users
    });
};

// delete users by id
export const _deleteUserByID = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ success: false });
    }

    const deleted = deleteUserByID(id);

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

// search user by name
export const _searchUserByName = (req: Request, res: Response) => {
    const name = req.params.name?.toString().toLowerCase() || "";

    const searchedUser = searchUserByName(name);

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

// delete all users
export const _deleteAllUsers = (req: Request, res: Response) => {
    const deleted = deleteAllUsers();

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

// add users with ID
export const _addUserWithID = (req: Request, res: Response) => {
    const { id, name } = req.body;

    const numericId = Number(id);

    if (
        Number.isNaN(numericId) ||
        typeof name !== "string" ||
        name.trim() === ""
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid ID or name. ID must be a valid number and name must be a non-empty string."
        });
    }

    const existingUser = users.find(u => u._id === numericId);
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "ID is already used."
        });
    }

    const user = createUserWithID(numericId, name);

    return res.status(201).json({
        success: true,
        user
    });
};


