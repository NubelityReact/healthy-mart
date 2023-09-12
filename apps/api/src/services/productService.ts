import { DocumentType } from "@typegoose/typegoose";
import ProductClass, { Product } from "../models/product";

export const getProductsService = async (): Promise<
  DocumentType<ProductClass>[]
> => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error("Failed to get products");
  }
};

export const getProductByIdService = async (
  id: string
): Promise<DocumentType<ProductClass> | null> => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    throw new Error("Failed to get product by ID");
  }
};

export const createProductService = async (
  productData: ProductClass
): Promise<DocumentType<ProductClass>> => {
  try {
    const newProduct = new Product(productData);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw new Error("Failed to create product");
  }
};

export const updateProductService = async (
  id: string,
  productData: Partial<ProductClass>
): Promise<DocumentType<ProductClass> | null> => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });
    return updatedProduct;
  } catch (error) {
    throw new Error("Failed to update product");
  }
};

export const deleteProductService = async (
  id: string
): Promise<DocumentType<ProductClass> | null> => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return deletedProduct;
  } catch (error) {
    throw new Error("Failed to delete product");
  }
};
