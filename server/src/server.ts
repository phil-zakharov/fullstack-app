import http from 'http';
import { router } from './routes/index.ts';
import { sendResponse } from '#utils/response.ts';
import { addHeaders } from '#middlewares/headers/index.ts';
import { authMiddleware } from '#middlewares/authorization/index.ts';

const server = http.createServer((req, res) => {
  addHeaders(res);
  
  try {
    authMiddleware(req, res);
    router(req, res);
  } catch (err) {
    if ((err as Error).message === 'Unauthorized') {
      sendResponse(res, 401, { error: 'Unauthorized' });
      return;
    } else if ((err as Error).message === 'Invalid token') {
      sendResponse(res, 402, { error: 'Invalid token' });
      return;
    }
    sendResponse(res, 500, { error: 'server error' });
  }
});

export { server };
