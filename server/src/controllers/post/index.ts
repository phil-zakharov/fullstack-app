import { prisma } from '#config/db.ts';
import { getCurrentUserInfo } from '#services/users/getUserInfo.ts';
import { getBody } from '#utils/body.ts';
import { sendError, sendResponse } from '#utils/response.ts';
import { IncomingMessage, ServerResponse } from 'http';

async function all(req: IncomingMessage, res: ServerResponse) {
  try {
    const posts = await prisma.post.findMany()

    sendResponse(res, 200, posts)
  } catch (error) {
    sendError(res, 400, (error as Error).message);
  }
}

async function add(req: IncomingMessage, res:ServerResponse) {
  try {
    const body = await getBody<{ title: string, text: string }>(req);

    if (!body) {
      throw new Error('body not found')
    }

    const currentUser = await getCurrentUserInfo(req)

    if (!currentUser) {
      throw new Error('current user error')
    }

    const { text, title } = body;
    console.log(' body:', body);

    await prisma.post.create({
      data: {
        text,
        title,
        author: {
          connect: {
            id: currentUser.id
          }
        }
      }
    })

    sendResponse(res, 200, 'ok')
  } catch (error) {
    sendError(res, 400, (error as Error).message);
  }
}

export const postController = {
  all,
  add,
}