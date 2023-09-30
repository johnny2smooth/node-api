import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = async (plaintextPassword) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plaintextPassword, salt);
};

// a JWT basically serves to create a string from an object
// the object that you pass should be something unique about the user
export const createJWT = (user: {
  username: string;
  id: string;
  password: string;
}) => {
  const token = jwt.sign(
    { id: user.id, user: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

interface UserRequest extends Request {
  user: string;
}

export const protect = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.send("Not Authorized");
    return;
  }

  let [, token] = bearer.split(" ");

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user as string;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("STOP RIGHT THERE, BUCKO!");
  }
};
