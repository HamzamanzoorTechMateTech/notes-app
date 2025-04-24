import { body } from "express-validator";

export const signupValidation = [
  body("firstName")
    .isLength({ min: 3 })
    .withMessage("firstName must be at least 3 characters long"),
  body("lastName")
    .isLength({ min: 3 })
    .withMessage("lastName must be at least 3 characters long"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
export const loginValidation = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
