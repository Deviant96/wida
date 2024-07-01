import { Request, Response } from "express";
import { mockProducts } from "../mockData";

export const getAllProducts = (req: Request, res: Response) => {
  res.send(mockProducts);
};
