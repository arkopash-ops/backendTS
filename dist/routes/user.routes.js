"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.post("/", user_controller_1._addUser);
router.get("/", user_controller_1._getAllUsers);
router.get("/search/:name", user_controller_1._searchUserByName);
router.delete("/:id", user_controller_1._deleteUserByID);
router.delete("/", user_controller_1._deleteAllUsers);
exports.default = router;
//# sourceMappingURL=user.routes.js.map