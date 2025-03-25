import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_SECRET || 'default_access_secret';
const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME || '15m';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';
const REFRESH_TOKEN_LIFETIME = process.env.REFRESH_TOKEN_LIFETIME || '7d';

const refreshTokens = new Map<string, Record<string, string>>();

export const generateAccessToken = (payload: Record<string, string>) => {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "1m",
    // expiresIn: ACCESS_TOKEN_LIFETIME as unknown as number,
  });
};

export const generateRefreshToken = (payload: Record<string, string>) => {
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_LIFETIME as unknown as number,
  });

  refreshTokens.set(refreshToken, payload);

  return refreshToken;
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, ACCESS_SECRET);
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch {
    return null;
  }
};

export const getPayload = (token: string) => {
  return refreshTokens.get(token);
}