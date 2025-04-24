import express from "express";
import Auth from "./Routers/Auth";
const router = express.Router();

router.use("/auth", Auth);
export default router;
