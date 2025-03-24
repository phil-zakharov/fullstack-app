import { prisma } from '#config/db.ts';
import { getBody } from '#utils/body.ts';
import { setCookie } from '#utils/cookie.ts';
import { comparePassword, hashPassword } from '#utils/hash.ts';
import { sendError, sendResponse } from '#utils/response.ts';
import { Prisma } from '@prisma/client';
import { IncomingMessage, ServerResponse } from 'http';
import jwt from 'jsonwebtoken';

async function sign_up(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getBody<Prisma.UserCreateInput>(req);

    const hashedPassword = await hashPassword(body.password);

    const result = await prisma.user.create({
      data: Prisma.validator<Prisma.UserCreateInput>()({ ...body, password: hashedPassword }),
    });

    const accessToken = generateAccessToken({ email: body.email });
    const refreshToken = generateRefreshToken({ email: body.email });

    setCookie(res, [
      'refreshToken',
      refreshToken,
      { secure: true, sameSite: 'strict', httpOnly: true, maxAge: 3_600_000 },
    ]);

    sendResponse(res, 200, { ...result, password: null, accessToken });
  } catch (error) {
    sendResponse(res, 400, { error });
  }
}

async function log_in(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getBody<{ email: string; password: string }>(req);

    const result = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!result) {
      sendResponse(res, 404, { error: 'Not found User' });
      return;
    }

    const checkPass = await comparePassword(body.password, result.password);

    if (!checkPass) {
      sendError(res, 401, 'Wrong password');
      return;
    }

    const accessToken = generateAccessToken({ email: body.email });
    const refreshToken = generateRefreshToken({ email: body.email });

    setCookie(res, [
      'refreshToken',
      refreshToken,
      { secure: true, sameSite: 'strict', httpOnly: true, maxAge: 3_600_000 },
    ]);

    sendResponse(res, 200, { ...result, password: null, accessToken });
  } catch (error) {
    sendResponse(res, 400, { error });
  }
}
export const userController = {
  sign_up,
  log_in,
};

const ACCESS_SECRET = process.env.JWT_SECRET || 'default_access_secret';
const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME || '15m';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';
const REFRESH_TOKEN_LIFETIME = process.env.REFRESH_TOKEN_LIFETIME || '7d';

const refreshTokens = new Set<string>();

const generateAccessToken = (payload: Record<string, string>) => {
  return jwt.sign(payload, ACCESS_SECRET, { 
    expiresIn: ACCESS_TOKEN_LIFETIME as unknown as number 
  });
};

const generateRefreshToken = (payload: Record<string, string>) => {
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_LIFETIME as unknown as number,
  });

  refreshTokens.add(refreshToken);
  
  return refreshToken;
};
