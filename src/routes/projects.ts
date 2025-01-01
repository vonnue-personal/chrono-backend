import { Router } from "express";
import { authMiddleWare } from "../middleware/auth";
import { errorHandler } from "../error-handler";
import { createProject } from "../controllers/projects";

const projectRoutes = Router();

projectRoutes.post("/", [authMiddleWare], errorHandler(createProject));

export default projectRoutes;
