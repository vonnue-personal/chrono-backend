import { Router } from "express";
import { authMiddleWare } from "../middleware/auth";
import { errorHandler } from "../error-handler";
import { getUserData } from "../controllers/user";

const userRoutes = Router();

userRoutes.get('/', [authMiddleWare], errorHandler(getUserData))

export default userRoutes;