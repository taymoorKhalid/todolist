import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import HttpError from "../models/http-error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let hasUser;
  try {
    hasUser = await User.findOne({ email }); // Use findOne for checking existing users
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  // Check if the user exists
  if (hasUser) {
    return next(
      new HttpError("Could not create user, email already exists.", 422)
    );
  }

  // Hash the password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again later.",
      500
    );
    return next(error);
  }

  const newUser = new User({
    email,
    password: hashedPassword, // Hash this password before saving
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError("Creating user failed, please try again.", 500));
  }

  res
    .status(201)
    .json({ message: "User created successfully!", userId: newUser.id });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next(new HttpError("Invalid Email, no user exists", 403));

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return next(new HttpError("Invalid password", 403));

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, "supersecret_dontshare", {
      expiresIn: "1h",
    });

    res.json({
      message: "Log In successfully!",
      userId: user.id,
      token,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Login failed", 500));
  }
};

export { signup, login };
