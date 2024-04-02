import { models, model, Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface UserSchemaInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  subscribers: number;
  // comparePasswordCustomMethod: (entered_password_by_user: string) => Promise<boolean>
}

const UserSchema = new Schema<UserSchemaInterface>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // If we fetch the user data the password field won't come in response.
  },
  username: {
    type: String,
    required: true,
  },
  subscribers: {
    type: Number,
    default: 0,
  },
});

// It hashes the password before saving the user in db.
UserSchema.pre("save", async function (next) {
  // 'this' keyword refers new user object
  // If password field is not changed go to next, bcz for reset password feature we don't want to hash password again.
  if (!this.isModified("password")) {
    next();
  }
  // updating the password field in the new user object
  this.password = await bcrypt.hash(this.password, 10);
  //2nd parameter is salt, which describes how much strong password we want
});

//Not working as of now
// We can use this method on user model to comapre password
/*UserSchema.methods.comparePasswordCustomMethod = async function name(
  entered_password_by_user: string
): Promise<boolean> {
  return await bcrypt.compare(entered_password_by_user, this.password);
};*/

// If User models is already there use that don't create new
const UserModel = models.User || model("User", UserSchema);
module.exports = UserModel;
