import { addCors } from '#middlewares/headers/cors.ts';
import { ServerResponse } from 'http';

export function addHeaders(res: ServerResponse) {
  addCors(res)
}