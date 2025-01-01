import { Request, Response } from "express";
import { prismaClient } from "../utils/prisma";

export const getUserData = async (req: any, res: Response) => {
  const userData = await prismaClient.users.findFirstOrThrow({
    where: {
      id: req.user.id,
    },
    include: {
      projects: true,
    },
  });

  res.json(userData);
};
