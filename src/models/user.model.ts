import type { User } from "../types/user.types";

export let users: User[] = [
    { _id: 1, name: "Abhi" },
    { _id: 2, name: "Mohit" }
];

let currentID = users.length;

export const generateID = (): number => {
    return ++currentID;
};
