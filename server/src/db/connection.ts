const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/test2")
  .then(() => console.log("Connected!"));

export default mongoose;
