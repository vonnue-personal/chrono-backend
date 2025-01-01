import { Router } from "express";
import { authMiddleWare } from "../middleware/auth";
import { errorHandler } from "../error-handler";
import { createEvent, deleteEvent, getEvents, getLogById, getLogs } from "../controllers/event";

const eventRoutes = Router();

eventRoutes.post("/", [authMiddleWare], errorHandler(createEvent));
eventRoutes.delete("/:id", [authMiddleWare], errorHandler(deleteEvent));
eventRoutes.get("/", [authMiddleWare], errorHandler(getEvents));
eventRoutes.get("/log", [authMiddleWare], errorHandler(getLogs));
eventRoutes.get("/log/:id", [authMiddleWare], errorHandler(getLogById));

export default eventRoutes;
