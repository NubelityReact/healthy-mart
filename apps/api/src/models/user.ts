import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { roles } from "../config/constants";

@pre<UserClass>("save", async function save() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})
class UserClass {
  @prop({ required: true })
  public name!: string;

  @prop({ unique: true })
  public username!: string;

  @prop({ enum: roles, default: roles.USER })
  public role?: string;

  @prop()
  public dateOfBirth?: Date;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop()
  public phone?: string;

  @prop({ required: true })
  public password!: string;

  @prop()
  public recoveryToken?: string;
}

export default UserClass;

export const User = getModelForClass(UserClass);
