import { NextFunction, Request, Response } from "express";
import {
  getCategoriesService,
  getCategoryByIdService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "../services/categoryService";
import { NotFoundError } from "../utils/errors/error.classes";
import { v2 as cloudinary } from "cloudinary";
import { PermittedImagesExtensions } from "../config/constants";

// GET /categories
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getCategoriesService();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// GET /categories/:id
export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const category = await getCategoryByIdService(id);
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

// POST /categories
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const image = req.file;
  if (!image) {
    throw new NotFoundError("Image not found");
  }
  try {
    const uploadedStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "healty-mart",
        public_id: image.originalname.trim().split(" ").join(""),
      },
      async (error, result) => {
        if (error) {
          throw new NotFoundError("Image not found");
        }
        if (!PermittedImagesExtensions.includes(result!.format)) {
          throw new NotFoundError("Image not found");
        }
        const category = { name, image: result!.url };
        const newCategory = await createCategoryService(category);
        res.status(201).json(newCategory);
        return result;
      }
    );
    uploadedStream.end(image.buffer);
  } catch (error) {
    next(error);
  }
};

// PUT /categories/:id
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, image } = req.body;
  const category = { name, image };
  try {
    const updatedCategory = await updateCategoryService(id, category);
    if (!updatedCategory) {
      throw new NotFoundError("Category not found");
    }
    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

// DELETE /categories/:id
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const deletedCategory = await deleteCategoryService(id);
    if (!deletedCategory) {
      throw new NotFoundError("Category not found");
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};
