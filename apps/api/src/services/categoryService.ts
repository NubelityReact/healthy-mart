import { DocumentType } from "@typegoose/typegoose";
import CategoryClass, { Category } from "../models/category";

export const getCategoriesService = async (): Promise<
  DocumentType<CategoryClass>[]
> => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    throw new Error("Failed to get categories");
  }
};

export const getCategoryByIdService = async (
  id: string
): Promise<DocumentType<CategoryClass> | null> => {
  try {
    const category = await Category.findById(id);
    return category;
  } catch (error) {
    throw new Error("Failed to get category by ID");
  }
};

export const createCategoryService = async (
  categoryData: CategoryClass
): Promise<DocumentType<CategoryClass>> => {
  try {
    const newCategory = new Category(categoryData);
    await newCategory.save();
    return newCategory;
  } catch (error) {
    throw new Error("Failed to create category");
  }
};

export const updateCategoryService = async (
  id: string,
  categoryData: Partial<CategoryClass>
): Promise<DocumentType<CategoryClass> | null> => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, {
      new: true,
    });
    return updatedCategory;
  } catch (error) {
    throw new Error("Failed to update category");
  }
};

export const deleteCategoryService = async (
  id: string
): Promise<DocumentType<CategoryClass> | null> => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    return deletedCategory;
  } catch (error) {
    throw new Error("Failed to delete category");
  }
};
