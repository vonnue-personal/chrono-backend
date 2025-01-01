import { Request, Response } from "express";
import { activityRecordSchema, activitySchema } from "../schemas/activity";
import { prismaClient } from "../utils/prisma";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";

export const createActivity = async (req: any, res: Response) => {
  const validatedData = activitySchema.parse(req.body);

  const newActivity = await prismaClient.activities.create({
    data: {
      name: validatedData.name,
      userId: req.user.id,
    },
  });

  res.json(newActivity);
};

export const deleteActivity = async (req: any, res: Response) => {
  const activity = await prismaClient.activities.delete({
    where: {
      id: +req.params.id,
      userId: req.user.id,
    },
  });

  if (!activity)
    throw new NotFoundException(
      "Activity not found",
      ErrorCodes.ACTIVITY_NOT_FOUND
    );

  res.json({ success: true });
};

export const addActivityRecord = async (req: any, res: Response) => {
  const validatedData = activityRecordSchema.parse(req.body);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const result = await prismaClient.$transaction(async (tx) => {
    const updatedRecord = await tx.activityRecords.upsert({
      where: {
        logId_activityId_date: {
          logId: validatedData.logId,
          activityId: validatedData.activityId,
          date: today,
        },
      },
      update: {
        value: validatedData.value,
      },
      create: {
        date: today,
        logId: validatedData.logId,
        activityId: validatedData.activityId,
        userId: req.user.id,
        value: validatedData.value,
      },
    });

    return updatedRecord;
  });

  res.json(result);
};
