import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// a JWT basically serves to create a string from an object
// the object that you pass should be something unique about the user
export const createJWT = (user) => {
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
  // Bearer token looks like: "Bearer asdfasf23qwero234"
  // the token is sent after a blank space
  let [, token] = bearer.split(" ");
  if (!token) {
    console.log("no token");
    res.status(401);
    res.send("Invalid Token");
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = user as string;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("STOP RIGHT THERE, BUCKO!");
  }
};
