import { Router } from "express";
import { signin, signup } from "../controllers/auth";
import { errorHandler } from "../error-handler";

const authRoutes = Router();

authRoutes.post("/signup", errorHandler(signup));
authRoutes.post("/signin", errorHandler(signin));

export default authRoutes;
