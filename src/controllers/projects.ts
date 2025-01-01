import { Response } from "express";
import { projectSchema } from "../schemas/project";
import { prismaClient } from "../utils/prisma";

export const createProject = async (req: any, res: Response) => {
  const validatedData = projectSchema.parse(req.body);

  const newProject = await prismaClient.projects.create({
    data: {
      name: validatedData.name,
      userId: req.user.id,
    },
  });

  res.json(newProject);
};

// TODO: GET CALL