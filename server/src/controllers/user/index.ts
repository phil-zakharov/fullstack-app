import { prisma } from '#config/db.ts';
import { UserService } from '#services/db/User.ts';
import { getCurrentUserInfo } from '#services/users/getUserInfo.ts';
import { getBody } from '#utils/body.ts';
import { getCookie, setCookie } from '#utils/cookie.ts';
import { comparePassword, hashPassword } from '#utils/hash.ts';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '#utils/jwtToken.ts';
import { sendError, sendResponse } from '#utils/response.ts';
import { Prisma } from '@prisma/client';
import { IncomingMessage, ServerResponse } from 'http';

async function sign_up(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getBody<Prisma.UserCreateInput>(req);

    const hashedPassword = await hashPassword(body.password);

    const result = await UserService.create(body, hashedPassword);

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

async function log_out(req: IncomingMessage, res: ServerResponse) {
  setCookie(res, [
    'refreshToken',
    '',
    { secure: true, sameSite: 'strict', httpOnly: true, maxAge: 0 },
  ]);
  sendResponse(res, 200, { message: 'logout success' });
}

async function refresh(req: IncomingMessage, res: ServerResponse) {
  try {
    const refreshToken = getCookie(req).refreshToken;

    const body = verifyRefreshToken(refreshToken) as Record<string, string>;

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

async function auto_login(req: IncomingMessage, res: ServerResponse) {
  try {
    const refreshToken = getCookie(req).refreshToken;

    const body = verifyRefreshToken(refreshToken) as Record<string, string>;

    const currentUser = await getCurrentUserInfo(req);

    const accessToken = generateAccessToken({ email: body.email });

    sendResponse(res, 200, { user: { ...currentUser, password: null }, accessToken });
  } catch (error) {
    sendError(res, 400, 'error');
  }
}

async function all(req: IncomingMessage, res: ServerResponse) {
  try {
    const currentUser = await getCurrentUserInfo(req);

    const result = await prisma.user.findMany({ select: { id: true, name: true, email: true }, where: { NOT: { email: currentUser?.email }} });

    sendResponse(res, 200, result);
  } catch (error) {
    sendError(res, 400, 'error');
  }
}

async function add_friend(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getBody<{ email: string }>(req);

    const currentUser = await getCurrentUserInfo(req);

    if (!currentUser) {
      throw new Error('current user serialize error');
    }

    const friend = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!friend) {
      throw new Error('friend not found');
    }

    await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        friends: {
          connect: { id: friend.id },
        },
      },
    });

    await prisma.user.update({
      where: {
        id: friend.id,
      },
      data: {
        friendOf: {
          connect: { id: currentUser.id },
        },
      },
    });

    sendResponse(res, 200, 'ok');
  } catch (error) {
    sendError(res, 400, (error as Error).message);
  }
}

async function delete_friend(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getBody<{ email: string }>(req);

    const currentUser = await getCurrentUserInfo(req);

    if (!currentUser) {
      throw new Error('current user serialize error');
    }

    const friend = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!friend) {
      throw new Error('friend not found');
    }

    await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        friends: {
          disconnect: { id: friend.id },
        },
      },
    });

    await prisma.user.update({
      where: {
        id: friend.id,
      },
      data: {
        friendOf: {
          disconnect: { id: currentUser.id },
        },
      },
    });

    sendResponse(res, 200, 'ok');
  } catch (error) {
    sendError(res, 400, (error as Error).message);
  }
}

async function get_user_friends(req: IncomingMessage, res: ServerResponse) {
  try {
    if (!req.url) {
      throw new Error('url error');
    }
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

    const query = Object.fromEntries(parsedUrl.searchParams.entries()) as { email: string };
    const currentUser = await getCurrentUserInfo(req);

    if (!currentUser) {
      throw new Error('current user serialize error');
    }

    const result = await prisma.user.findUnique({
      where: { email: query.email },
      include: { friends: true },
    });

    sendResponse(
      res,
      200,
      result?.friends.map(({ id, name, email }) => ({ id, name, email })),
    );
  } catch (error) {
    sendError(res, 400, (error as Error).message);
  }
}

export const userController = {
  sign_up,
  log_in,
  log_out,
  refresh,
  auto_login,
  all,
  add_friend,
  delete_friend,
  get_user_friends,
};
