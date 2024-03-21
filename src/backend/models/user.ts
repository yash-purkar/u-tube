// import {Schema} from "mongoose";
const {Schema,models,model} = require('mongoose')
interface UserSchemaInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UserSchema:any = new Schema({
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
  },
});

// If User models is already there use that don't create new
const UserModel = models.User || model("User", UserSchema);
module.exports = UserModel;
