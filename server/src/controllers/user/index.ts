import { prisma } from '#config/db.ts';
import { getBody } from '#utils/body.ts';
import { getCookie, setCookie } from '#utils/cookie.ts';
import { comparePassword, hashPassword } from '#utils/hash.ts';
import { generateAccessToken, generateRefreshToken, getPayload, verifyAccessToken, verifyRefreshToken } from '#utils/jwtToken.ts';
import { sendError, sendResponse } from '#utils/response.ts';
import { Prisma } from '@prisma/client';
import { IncomingMessage, ServerResponse } from 'http';

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
      { secure: true, sameSite: 'strict', httpOnly: true, maxAge: 3_600 },
    ]);

    sendResponse(res, 200, { user: { ...result, password: null }, accessToken });
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
      sendError(res, 404, 'Not found User');
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

    sendResponse(res, 200, { user: { ...result, password: null }, accessToken });
  } catch (error) {
    sendResponse(res, 400, { error });
  }
}

async function log_out(req: IncomingMessage, res: ServerResponse) {}

async function refresh(req: IncomingMessage, res: ServerResponse) {
  try {
    const refreshToken = getCookie(req).refreshToken;
    console.log(' refreshToken:', refreshToken);

    const body = verifyRefreshToken(refreshToken) as Record<string, string>;
    console.log(' body:', body);

    if (!body) {
      sendError(res, 401, 'Invalid token');
      return;
    }

    const accessToken = generateAccessToken({ email: body.email });
    console.log(' accessToken:', accessToken);

    sendResponse(res, 200, { accessToken });

  } catch (error) {
    sendError(res, 400, 'error');
  }
}

export const userController = {
  sign_up,
  log_in,
  log_out,
  refresh,
};


