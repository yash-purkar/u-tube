const { Schema, models, model } = require("mongoose");
interface UserSchemaInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  subscribers: number;
}

const UserSchema: any = new Schema({
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

// If User models is already there use that don't create new
const UserModel = models.User || model("User", UserSchema);
module.exports = UserModel;
