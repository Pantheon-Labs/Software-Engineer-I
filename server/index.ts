import express, { Application, Request, Response } from "express";
import skillsRoute from "./src/routes/skills";

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/skills", skillsRoute);

app.listen(port, (): void => {
  console.log(`Connected successfully on port ${port}`);
});
