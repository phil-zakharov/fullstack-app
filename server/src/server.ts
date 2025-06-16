import http from 'http';
import { router } from './routes/index.ts';
import { sendResponse } from '#utils/response.ts';
import { addHeaders } from '#middlewares/headers/index.ts';
import { authMiddleware } from '#middlewares/authorization/index.ts';
import { errorHandler } from '#services/errorHandler.ts';

const server = http.createServer((req, res) => {
  addHeaders(res);
  
  try {
    authMiddleware(req, res);
    
    router(req, res);
  } catch (err) {
    errorHandler(err, res)
  }
});

export { server };
