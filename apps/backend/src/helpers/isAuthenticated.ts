import { Request, Response, NextFunction } from "express";
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  req.user
    ? next()
    : res.status(401).json({
        success: false,
      });
};

export default isAuthenticated;
