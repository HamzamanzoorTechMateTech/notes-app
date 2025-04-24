require("dotenv").config();
import express, { Request, Response } from "express";
import {
  loginValidation,
  signupValidation,
} from "../middlewares/ParamsValidater";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../schemas/User";
import { authenticationLayer } from "../middlewares/gaurd";
const router = express.Router();
const privateKey = process.env.JWT_PRIVATE_KEY || "";
router.get("/", authenticationLayer, async (req: any, res: any) => {
  return res.send("auth working");
});
// login route
router.post("/", loginValidation, async (req: Request, res: any) => {
  console.log(privateKey);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email: email.toLowerCase() });
      if (!user) {
        throw new Error("Email or Password is uncorrect!");
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (err) throw new Error("Password is uncorrect ");
        else if (result) {
          const newUser = { ...user };
          delete newUser.password;
          jwt.sign(
            { ...newUser },
            privateKey,
            { algorithm: "HS256" },
            function (err, token) {
              if (err) throw new Error("Unable to generate token");
              res.json({ token, user });
            }
          );
        } else throw new Error("Email or Password is uncorrect ");
      });
    } catch (error: any) {
      console.log(error.message);

      return res.status(400).json({ error: error.message });
    }
  }
});
router.post("/signup", signupValidation, async (req: Request, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      const { firstName, lastName, email, password } = req.body;
      const user = await Users.findOne({ email });
      console.log({ user });

      if (user) {
        return res
          .status(400)
          .json({ error: "User Already exist with same email" });
      }
      await bcrypt.hash(password, 10, async (err, hash) => {
        if (err) throw new Error("Unable to hash password");
        const newUser = await Users({
          firstName,
          lastName,
          email: email.toLowerCase(),
          password: hash,
        });
        newUser.save();

        return res.json({ message: "user created successfull" });
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
});
export default router;
