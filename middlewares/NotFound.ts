import { NextFunction, Request, Response } from "express";

export default class ErrorNotFoundMiddleware {
  static handle(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl.startsWith("/api")) {
      res.status(404).json({
        error: `API ${req.originalUrl} endpoint not found`,
      });
      // to make proccess.env must install dotenv
    }

    res.status(404).render("notFound", {
      pageTitle: "Oops! Something went wrong",
      message: "The page ${req.originalUrl} are looking for not existent",
    });
    next();
  }
}
