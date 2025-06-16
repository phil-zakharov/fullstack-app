import { sendResponse } from '#utils/response.ts';
import { ServerResponse } from 'http';

export function errorHandler(error: unknown, res: ServerResponse) {
  if ((error as Error).message === 'Unauthorized') {
    sendResponse(res, 401, { error: 'Unauthorized' });
  } else if ((error as Error).message === 'Invalid token') {
    sendResponse(res, 402, { error: 'Invalid token' });
  } else {
    sendResponse(res, 500, { error: 'server error' });
  }
}
