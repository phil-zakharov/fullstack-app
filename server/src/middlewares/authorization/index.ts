import { prisma } from '#config/db.ts';
import { getBody } from '#utils/body.ts';
import { sendResponse } from '#utils/response.ts';
import { IncomingMessage, ServerResponse } from 'http';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'default_access_secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';
const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME || '15m';
const REFRESH_TOKEN_LIFETIME = process.env.REFRESH_TOKEN_LIFETIME || '7d';

export async function authorization(req: IncomingMessage, res: ServerResponse, cb: (req: IncomingMessage, res: ServerResponse) => void) {
  if (req.url !== '/login' && req.url !== '/signup') {
    const authHeader = req.headers.authorization;
    console.log(' authHeader:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      console.log('authHeader error');
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token, SECRET);
    console.log(' decoded:', decoded);

    if (!decoded) {
      console.log('decoded error');
      return;
    }
  }
}

const verifyToken = (token: string, secret: string): JwtPayload | string | null => {
  try {
    return verify(token, secret);
  } catch {
    return null;
  }
};
