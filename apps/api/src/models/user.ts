import { getModelForClass, prop } from "@typegoose/typegoose";

class UserClass {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop()
  public phone?: string;
}

export default UserClass;

export const User = getModelForClass(UserClass);
