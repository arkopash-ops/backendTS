import { generateID, users } from "../models/user.model";
import { User } from "../types/user.types";

// add users
export const createUser = (name: string): User => {
    const newUser: User = {
        _id: generateID(),
        name: name.trim()
    };

    users.push(newUser);
    return newUser;
};

// get all users
export const getAllUsers = (): User[] => {
    return users;
};

// delete usrs by id
export const deleteUserByID = (id: number): boolean => {
    const index = users.findIndex(u => u._id === id);
    if (index === -1) return false;

    users.splice(index, 1);
    return true;
};

// search users by name
export const searchUserByName = (name: string): User[] => {
    const searchName = name.trim().toLowerCase();
    return users.filter(u => u.name.toLowerCase().includes(searchName));
}

// delete all users
export const deleteAllUsers = (): boolean => {
    if (users.length === 0) return false;

    users.length = 0;
    return true;
};

// add users with ID
export const createUserWithID = (id: number,name: string): User =>{
    const newUser: User = {
        _id: id,
        name: name.trim()
    };

    users.push(newUser);
    return newUser;
}
