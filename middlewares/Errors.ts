import { error } from "console";
import { NextFunction, Request, Response } from "express";

export default class ErrorMiddleware {
  constructor() {}
  handle(err: Error, res: Response, req: Request, next: NextFunction) {
    if (req.originalUrl) {
      res.status(500).json({
        error: "Internal Server Error",
        message: err.message,
        url: req.originalUrl,
      });
    }
    next();
  }
}
