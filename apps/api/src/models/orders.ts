import { Ref, getModelForClass, pre, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import ProductClass, { Product } from "./product";

enum OrderStatus {
  OrderPlaced = "Order placed",
  ConfirmationOfOrder = "Confirmation of order",
  OrderShipped = "Order shipped",
  OutForDelivery = "Out of delivery",
  ToBeDelivered = "To be delivered",
}

@pre<OrderClass>("save", async function save() {
  const products = await Product.find({ _id: { $in: this.items } });
  this.total = products.reduce((a, b) => a + b.price.cost, 0);
})
class OrderClass extends TimeStamps {
  @prop()
  public orderNumber!: number;

  @prop({ required: true, enum: OrderStatus })
  public status!: OrderStatus;

  @prop({ ref: () => ProductClass })
  public items!: Ref<ProductClass>[];

  @prop()
  public total?: number;
}

export default OrderClass;

export const Order = getModelForClass(OrderClass);
