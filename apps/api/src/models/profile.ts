import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import UserClass from "./user";
import ProductClass from "./product";
import OrderClass from "./orders";

class AddressDetails {
  @prop()
  public street!: string;

  @prop()
  public city!: string;

  @prop()
  public country!: string;

  @prop()
  public zipCode!: string;
}

class Address {
  @prop()
  public name!: string;

  @prop()
  public phone!: string;

  @prop()
  public address!: AddressDetails;

  @prop()
  isDefault!: boolean;
}

class PaymentMethod {
  @prop()
  public name!: string;

  @prop()
  public cardNumber!: string;

  @prop()
  public expireDate!: string;

  @prop()
  public cvv!: string;

  @prop()
  public isDefault!: boolean;
}

class CartItem {
  @prop({ ref: () => ProductClass })
  public product!: Ref<ProductClass>;

  @prop()
  public quantity!: number;
}

class Cart {
  @prop()
  public items!: CartItem[];

  @prop()
  public subTotal!: number;

  @prop()
  public shippingFee!: number;

  @prop()
  public total?: number;
}

class ProfileClass {
  @prop({ ref: () => UserClass })
  public infomation!: Ref<UserClass>;

  @prop()
  public cart!: Cart;

  @prop({ ref: () => ProductClass })
  public favorites!: Ref<ProductClass>[];

  @prop()
  public addresses!: Address[];

  @prop()
  public paymentMethods!: PaymentMethod[];

  @prop({ ref: () => OrderClass })
  public orders!: Ref<OrderClass>[];
}

export default ProfileClass;

export const Profile = getModelForClass(ProfileClass);
