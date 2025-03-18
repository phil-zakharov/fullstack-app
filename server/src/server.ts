import http from 'http';
import { router } from './routes/index.ts';
import { sendResponse } from '#utils/response.ts';
import { addHeaders } from '#middlewares/headers/index.ts';

const server = http.createServer((req, res) => {
  addHeaders(res);
  
  try {
    router(req, res);
  } catch (err) {
    sendResponse(res, 500, { error: 'server error' });
  }
});

export { server };
