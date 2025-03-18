import { prisma } from '#config/db.ts';
import { getBody } from '#utils/body.ts';
import { sendResponse } from '#utils/response.ts';
import { Prisma } from '@prisma/client'
import { Controller } from '../types.ts';
import { IncomingMessage, ServerResponse } from 'http';

const createUser = (
  body: Prisma.UserCreateInput,
) => {
  return Prisma.validator<Prisma.UserCreateInput>()(body)
}

async function sign_up(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getBody<Prisma.UserCreateInput>(req);

    const result = await prisma.user.create({
      data: createUser(body),
    });

    sendResponse(res, 200, { user: result });
  } catch(error) {
    sendResponse(res, 400, { error })
  }
}

async function log_in(req: IncomingMessage, res: ServerResponse) {
  try {
    
  } catch (error) {
    
  }
}
export const userController = {
  sign_up,
  log_in
};
