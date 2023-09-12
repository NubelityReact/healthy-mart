import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController";
import verifyTokenMiddleware from "../middlewares/handleJWT";
import checkRoles from "../middlewares/checkRoles";
import { roles } from "../config/constants";

const router = express.Router();

// GET /products
router.get("/", getProducts);

// GET /products/:id
router.get("/:id", getProductById);

// POST /products
router.post("/", verifyTokenMiddleware, checkRoles(roles.ADMIN), createProduct);

// PUT /products/:id
router.put("/:id", updateProduct);

// DELETE /products/:id
router.delete("/:id", deleteProduct);

export default router;
