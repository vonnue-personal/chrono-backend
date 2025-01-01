import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unautherized";
import { ErrorCodes } from "../exceptions/root";
import { supabaseClient } from "../utils/supabase";
import { prismaClient } from "../utils/prisma";

export const authMiddleWare = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    next(new UnauthorizedException("unautherized", ErrorCodes.UNAUTHORIZED));
  }

  try {
    const { data, error } = await supabaseClient.auth.getUser(token);

    if (error) {
      if (error.message.includes("expired")) {
        const refreshToken = req.cookies.refresh_token;

        const { } = await supabaseClient.auth.refreshSession(refreshToken)
      }
      next(new UnauthorizedException("UnauthOrized", ErrorCodes.UNAUTHORIZED));
    }

    const user = await prismaClient.users.findFirst({
      where: {
        uId: data.user?.id,
      },
    });

    if (!user) {
      next(new UnauthorizedException("UnauthOrized", ErrorCodes.UNAUTHORIZED));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedException("UnauthOrized", ErrorCodes.UNAUTHORIZED));
  }
};
