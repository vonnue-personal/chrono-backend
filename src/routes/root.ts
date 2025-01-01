import { Router } from "express";
import authRoutes from "./auth";
import projectRoutes from "./projects";
import userRoutes from "./user";
import eventRoutes from "./events";
import activityRoutes from "./activity";

const rootRoutes = Router();

rootRoutes.use("/auth", authRoutes);
rootRoutes.use("/project", projectRoutes);
rootRoutes.use("/user", userRoutes);
rootRoutes.use("/event", eventRoutes);
rootRoutes.use("/activity", activityRoutes);

export default rootRoutes;
