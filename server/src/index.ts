import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes";
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.json("App is working");
});
app.use(router);
app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});
