import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { Route } from './types.ts';
import { userRoutes } from './user/index.ts';
import { sendResponse } from '#utils/response.ts';
import { postRoutes } from './posts/index.ts';

const routes: Route = {
  api: {
    user: userRoutes,
    post: postRoutes,
  }
};

export async function router(req: IncomingMessage, res: ServerResponse) {
  if (!req.url || !req.method) return sendResponse(res, 400, { error: 'Invalid request' });

  const { pathname } = parse(req.url, true);

  if (!pathname) return sendResponse(res, 400, { error: 'Invalid request' });

  const pathArray = pathname.split('/').slice(1);

  let cursor = routes;

  for (const path of pathArray) {
    cursor = cursor[path]
  }

  if (!cursor) return sendResponse(res, 400, { error: 'Invalid request' });

  cursor = cursor[req.method]

  if (typeof cursor === 'function') {
    cursor(req, res)
  } else {
    sendResponse(res, 400, { error: "404" })
  }
}
