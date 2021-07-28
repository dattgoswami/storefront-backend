import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyAuthToken = (
  req: Request,
  res: Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader: string | undefined = req.headers.authorization;
    let token: string = "";
    if (authorizationHeader !== undefined) {
      token = authorizationHeader.split(" ")[1];
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    next();
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

export default verifyAuthToken;
