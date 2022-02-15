import express, { Request, Response, NextFunction } from "express";

const getSkills = (req: Request, res: Response, next: NextFunction): void => {
  res.send({ status: "ok" });
};

export default getSkills;
