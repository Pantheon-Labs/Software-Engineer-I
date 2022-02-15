import express from "express";
import { getSkills } from "../../controllers/skills";

const skillsRoute = express.Router();

skillsRoute.get("/", getSkills);

export default skillsRoute;
