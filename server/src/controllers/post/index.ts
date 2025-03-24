import { sendResponse } from '#utils/response.ts';
import { IncomingMessage, ServerResponse } from 'http';

async function getAllPosts(req: IncomingMessage, res: ServerResponse) {
  sendResponse(res, 200, { data: [{ post: 1 }, { post: 2 }] });
}

export const postController = {
  getAllPosts
}