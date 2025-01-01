import { Request, Response } from "express";
import { signInSchema, signUpSchema } from "../schemas/auth";
import { supabaseClient } from "../utils/supabase";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/root";
import { prismaClient } from "../utils/prisma";

export const signup = async (req: Request, res: Response) => {
  const validatedData = signUpSchema.parse(req.body);

  const { data, error } = await supabaseClient.auth.signUp({
    email: validatedData.email,
    password: validatedData.password,
  });

  if (error) {
    throw new BadRequestException(
      error.message,
      ErrorCodes.AUTHENTICATION_FAILED
    );
  }

  if (!data.user)
    throw new BadRequestException(
      "User data not found",
      ErrorCodes.AUTHENTICATION_FAILED
    );

  const newUser = await prismaClient.users.create({
    data: {
      uId: data.user?.id,
      email: validatedData.email,
      username: validatedData.username,
    },
  });

  res.json({
    user: newUser,
    access_token: data.session?.access_token,
    refresh_token: data.session?.refresh_token,
  });
};

export const signin = async (req: Request, res: Response) => {
  const validatedData = signInSchema.parse(req.body);

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: validatedData.email,
    password: validatedData.password,
  });

  if (error) {
    throw new BadRequestException(
      error.message,
      ErrorCodes.INCORRECT_EMAIL_OR_PASSWORD
    );
  }

  const user = await prismaClient.users.findFirstOrThrow({
    where: {
      uId: data.user.id,
    },
  });

  res.json({
    user,
    access_token: data.session?.access_token,
    refresh_token: data.session?.refresh_token,
  });
};
