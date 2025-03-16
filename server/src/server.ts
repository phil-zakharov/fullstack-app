import http from 'http';
import { router } from './routes/index.ts';
import { sendResponse } from '#utils/response.ts';

const server = http.createServer((req, res) => {
  try {
    router(req, res);
  } catch (err) {
    sendResponse(res, 500, { error: 'server error' });
  }
});

export { server };
