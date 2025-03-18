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
  if (req.url === '/login') {
    if (req.method === 'POST') {
      const body = await getBody<{ email: string; password: string }>(req);

      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });

      if (user && user.password === body.password) {
        const accessToken = generateAccessToken({ username: user.email });
        const refreshToken = generateRefreshToken({ username: user.email });

        res.setHeader("Authorization", `Bearer ${accessToken}`);
        res.setHeader(
          'Set-Cookie',
          `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/refresh`,
        );
        cb(req, res);
      } else {
        sendResponse(res, 404, { error: 'user not found' });
      }
    } else {
      sendResponse(res, 401, { error: 'unauthorized' });
    }
  } else {
  }
}

const refreshTokens = new Set<string>(); // Храним refresh-токены

const generateAccessToken = (payload: object) => {
  return sign({}, SECRET, { expiresIn: ACCESS_TOKEN_LIFETIME as unknown as number });
};

const generateRefreshToken = (payload: object) => {
  const refreshToken = sign(payload, REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_LIFETIME as unknown as number,
  });
  refreshTokens.add(refreshToken); // Добавляем в хранилище
  return refreshToken;
};

const verifyToken = (token: string, secret: string): JwtPayload | string | null => {
  try {
    return verify(token, secret);
  } catch {
    return null;
  }
};
