import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController";

const router = Router();

// GET /users
router.get("/", getUsers);

// GET /users/:id
router.get("/:id", getUserById);

// POST /users
router.post("/", createUser);

// PUT /users/:id
router.put("/:id", updateUser);

// DELETE /users/:id
router.delete("/:id", deleteUser);

export default router;
