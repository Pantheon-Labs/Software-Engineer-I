import express, { Application } from "express";
import skillsRoute from "./src/routes/skills";
import cors from "cors";

const app: Application = express();
const port = 3001;

app.use(cors());

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/skills", skillsRoute);

app.listen(port, (): void => {
  console.log(`Connected successfully on port ${port}`);
});
