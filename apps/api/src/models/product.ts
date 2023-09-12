import {
  DocumentType,
  Ref,
  getModelForClass,
  pre,
  prop,
} from "@typegoose/typegoose";
import UserClass from "./user";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import CategoryClass from "./category";

class Price {
  @prop({ required: true, min: 1 })
  public cost!: number;

  @prop({ required: true })
  public weight!: string;
}

class Review extends TimeStamps {
  @prop({ ref: () => UserClass })
  public user!: Ref<UserClass>;

  @prop({ required: true, min: 0, max: 5 })
  public score!: number;

  @prop({ required: true })
  public comment!: string;
}

@pre<ProductClass>("save", function () {
  this.score =
    this.reviews.reduce((a, b) => a + b.score, 0) / this.reviews.length;
})
class ProductClass {
  @prop()
  public name!: string;

  @prop({ ref: () => CategoryClass })
  public category!: Ref<CategoryClass>;

  @prop()
  public price!: Price;

  @prop()
  public image!: string;

  @prop()
  public description!: string;

  @prop({ default: 0 })
  public score?: number;

  @prop({ type: () => [Review] })
  public reviews!: Review[];

  // public async addReview(this: DocumentType<ProductClass>, review: Review) {
  //   this.reviews.push(review);
  //   this.score = this.reviews.reduce((a, b) => a + b.score, 0) / this.reviews.length;
  //   await this.save();
  // }
}

export default ProductClass;

export const Product = getModelForClass(ProductClass);
