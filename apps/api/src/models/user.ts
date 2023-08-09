import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import bcrypt from "bcrypt";

@pre<UserClass>("save", async function save() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})
class UserClass {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop()
  public phone?: string;
}

export default UserClass;

export const User = getModelForClass(UserClass);
