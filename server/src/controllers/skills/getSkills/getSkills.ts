import { Request, Response, NextFunction } from "express";
import { data } from "../../../db/data";

const getSkills = (req: Request, res: Response, next: NextFunction): void => {
  res.send({ status: "ok", data: data });
};

export default getSkills;
