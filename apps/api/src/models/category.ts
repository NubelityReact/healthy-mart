import { getModelForClass, prop } from "@typegoose/typegoose";

class CategoryClass {
  @prop()
  public name!: string;

  @prop()
  public image!: string;
}

export default CategoryClass;

export const Category = getModelForClass(CategoryClass);
