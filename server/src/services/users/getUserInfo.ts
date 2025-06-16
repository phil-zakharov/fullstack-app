import { prisma } from '#config/db.ts';
import { getCookie } from '#utils/cookie.ts';
import { verifyRefreshToken } from '#utils/jwtToken.ts';
import { IncomingMessage } from 'http';

export async function getCurrentUserInfo(req: IncomingMessage) {
  const refreshToken = getCookie(req).refreshToken;

  const body = verifyRefreshToken(refreshToken) as Record<string, string>;

  return await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });
}
