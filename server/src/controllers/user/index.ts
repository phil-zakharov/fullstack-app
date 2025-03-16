import { prisma } from '#config/db.ts';
import { getBody } from '#utils/body.ts';
import { sendResponse } from '#utils/response.ts';
import { Prisma } from '@prisma/client'
import { Controller } from '../types.ts';

const createUser = (
  body: Prisma.UserCreateInput,
) => {
  return Prisma.validator<Prisma.UserCreateInput>()(body)
}
export const userController: Controller = {
  create: async (req, res) => {
    try {
      const body = await getBody<Prisma.UserCreateInput>(req);
  
      const result = await prisma.user.create({
        data: createUser(body),
      });
  
      console.log(req.url, result);
      sendResponse(res, 200, { user: result });
    } catch(error) {
      sendResponse(res, 400, { error })
    }
  },
};
