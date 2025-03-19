import { prisma } from '#config/db.ts';
import { getBody } from '#utils/body.ts';
import { sendResponse } from '#utils/response.ts';
import { Prisma } from '@prisma/client'
import { IncomingMessage, ServerResponse } from 'http';

async function sign_up(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getBody<Prisma.UserCreateInput>(req);

    const result = await prisma.user.create({
      data: Prisma.validator<Prisma.UserCreateInput>()(body),
    });

    sendResponse(res, 200, { ...result, password: null });
  } catch(error) {
    sendResponse(res, 400, { error })
  }
}

async function log_in(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getBody<Prisma.UserWhereInput>(req);

    const result = await prisma.user.findFirst({
      where: {
        email: body.email
      }
    })

    if (!result) {
      sendResponse(res, 404, { error: "Not found User" })
      return;
    }

    sendResponse(res, 200, { ...result, password: null });
  } catch (error) {
    sendResponse(res, 400, { error })
  }
}
export const userController = {
  sign_up,
  log_in
};
