import { Router } from "express";
import { authMiddleWare } from "../middleware/auth";
import { errorHandler } from "../error-handler";
import { addActivityRecord, createActivity, deleteActivity } from "../controllers/activity";

const activityRoutes = Router();

activityRoutes.post("/", [authMiddleWare], errorHandler(createActivity));
activityRoutes.post("/record", [authMiddleWare], errorHandler(addActivityRecord));
activityRoutes.delete("/:id", [authMiddleWare], errorHandler(deleteActivity));

export default activityRoutes;
