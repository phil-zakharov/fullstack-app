import { verifyAccessToken } from '#utils/jwtToken.ts';
import { IncomingMessage, ServerResponse } from 'http';

export function authMiddleware(req: IncomingMessage, res: ServerResponse) {
  if (req.url?.startsWith('/api/user')) {
    return;
  }

  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    throw new Error('Unauthorized');
  }

  const decoded = verifyAccessToken(accessToken);

  if (!decoded) {
    throw new Error('Invalid token');
  }
}
