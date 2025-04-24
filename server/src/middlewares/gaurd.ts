require("dotenv").config();
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { authRequest } from "../types";
const privateKey = process.env.JWT_PRIVATE_KEY || "";

export const authenticationLayer: any = (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token is require for this" });
  }
  jwt.verify(token, privateKey, function (err: any, decoded: any) {
    if (err) {
      return res.status(401).json({ error: "Unauthorize access" });
    }
    req.user = decoded;
    next();
  });
};
