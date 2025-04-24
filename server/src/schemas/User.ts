import mongoose from "../db/connection";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UsersSchema = new Schema({
  id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const Users = mongoose.model("Users", UsersSchema);
export default Users;
