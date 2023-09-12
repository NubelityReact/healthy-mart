import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoriesController";
import multer from "multer";
import verifyTokenMiddleware from "../middlewares/handleJWT";
import checkRoles from "../middlewares/checkRoles";
import { roles } from "../config/constants";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// GET /categories
router.get("/", getCategories);

// GET /categories/:id
router.get("/:id", getCategoryById);

// POST /categories
router.post(
  "/",
  verifyTokenMiddleware,
  checkRoles(roles.ADMIN, roles.USER),
  upload.single("image"),
  createCategory
);

// PUT /categories/:id
router.put("/:id", updateCategory);

// DELETE /categories/:id
router.delete("/:id", deleteCategory);

export default router;
