import { Router } from "express";
import {
    _addUser,
    _deleteAllUsers,
    _deleteUserByID,
    _getAllUsers,
    _searchUserByName,
} from "../controllers/user.controller";

const router = Router();

router.post("/", _addUser);
router.get("/", _getAllUsers);
router.get("/search/:name", _searchUserByName);
router.delete("/:id", _deleteUserByID);
router.delete("/", _deleteAllUsers);

export default router;
