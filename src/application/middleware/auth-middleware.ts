import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../utils/env";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  try {
    const token = bearer.split(" ")[1];
    jwt.verify(token, env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
}
