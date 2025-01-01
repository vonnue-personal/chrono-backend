import { Response } from "express";
import { eventSchema, getEventsSchema } from "../schemas/event";
import { prismaClient } from "../utils/prisma";
import { UnauthorizedException } from "../exceptions/unautherized";
import { ErrorCodes } from "../exceptions/root";

export const createEvent = async (req: any, res: Response) => {
  const validatedData = eventSchema.parse(req.body);

  const startTime = new Date(validatedData.startTime);
  const endTime = new Date();

  const durationMs = endTime.getTime() - startTime.getTime();
  const durationSeconds = Math.round(durationMs / 1000);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const project = await prismaClient.projects.findFirst({
    where: { id: validatedData.projectId },
  });

  if (project?.userId !== req.user.id)
    throw new UnauthorizedException("UnAuthorized", ErrorCodes.UNAUTHORIZED);

  const result = await prismaClient.$transaction(async (tx) => {
    const existingLog = await tx.statusLogs.findUnique({
      where: {
        date_userId: {
          date: today,
          userId: req.user.id,
        },
      },
    });

    const updatedLog = await tx.statusLogs.upsert({
      where: {
        date_userId: {
          date: today,
          userId: req.user.id,
        },
      },
      update: {
        totalDuration: (existingLog?.totalDuration ?? 0) + durationSeconds,
      },
      create: {
        day: new Date().getDay(),
        totalDuration: durationSeconds,
        date: today,
        userId: req.user.id,
      },
    });

    const newEvent = await tx.events.create({
      data: {
        projectId: validatedData.projectId,
        description: validatedData.description,
        startTime: validatedData.startTime,
        duration: durationSeconds,
        userId: req.user.id,
        logId: updatedLog.id,
      },
    });

    return { updatedLog, newEvent };
  });

  res.json(result.newEvent);
};

export const deleteEvent = async (req: any, res: Response) => {
  const user = await prismaClient.users.findFirstOrThrow({
    where: {
      id: req.user.id,
    },
  });

  const event = await prismaClient.events.findFirstOrThrow({
    where: {
      id: req.params.id,
    },
  });

  if (user.id !== event.userId)
    throw new UnauthorizedException("UnAuthorized", ErrorCodes.UNAUTHORIZED);

  return await prismaClient.$transaction(async (tx) => {
    const log = await tx.statusLogs.findFirst({
      where: { id: event?.logId, userId: req.user.id },
    });

    await tx.statusLogs.update({
      where: { id: event?.logId, userId: req.user.id },
      data: {
        totalDuration: (log?.totalDuration ?? 0) - (event?.duration ?? 0),
      },
    });

    await prismaClient.events.delete({
      where: {
        id: +req.params.id,
        userId: req.user.id,
      },
    });

    res.json({ success: true });
  });
};

export const getEvents = async (req: any, res: Response) => {
  const { date } = getEventsSchema.parse(req.body);

  let startOfDay = new Date(`${date}T00:00:00.000Z`);
  let endOfDay = new Date(`${date}T23:59:59.999Z`);

  const events = await prismaClient.events.findMany({
    where: {
      userId: req.user.id,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  res.json(events);
};

export const getLogById = async (req: any, res: Response) => {
  const log = await prismaClient.statusLogs.findFirstOrThrow({
    where: { id: +req.params.id },
    include: {
      events: true,
      activityRecords: true,
    },
  });

  res.json(log);
};

export const getLogs = async (req: any, res: Response) => {
  const log = await prismaClient.statusLogs.findMany({
    where: { userId: req.user.id },
    include: {
      events: true,
      activityRecords: true,
    },
  });

  res.json(log);
};
