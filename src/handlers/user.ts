import prisma from "../db";
import { Request, Response } from "express";
import { createJWT, hashPassword, comparePasswords } from "../modules/auth";

export const createNewUser = async (req: Request, res: Response) => {
  let user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signin = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  if (!user) {
    res.status(401);
    res.send("User not found. Sign up");
    return;
  }
  const isValidPassword = await comparePasswords(
    req.body.password,
    user.password
  );
  if (!isValidPassword) {
    res.status(401);
    res.send("Wrong Password!");
    return;
  }
  // pass them a jwt?
  const token = createJWT(user);
  res.json({ token });
};
