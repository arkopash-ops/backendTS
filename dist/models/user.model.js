"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateID = exports.users = void 0;
exports.users = [
    { _id: 1, name: "Abhi" },
    { _id: 2, name: "Mohit" }
];
let currentID = exports.users.length;
const generateID = () => {
    return ++currentID;
};
exports.generateID = generateID;
//# sourceMappingURL=user.model.js.map