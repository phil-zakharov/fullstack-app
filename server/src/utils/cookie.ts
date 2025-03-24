import { ServerResponse } from 'http';

type Params = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax';
  maxAge?: number;
  path?: string;
  expires?: Date;
};

type Cookie = [string, string, Params] | [string, string];

export function setCookie(res: ServerResponse, ...cookieArr: Cookie[]) {
  const allCookie = [];

  for (const [key, value, params = {}] of cookieArr) {
    const cookies = [`${key}=${value}`];

    const { httpOnly, secure, sameSite, path = '/', maxAge, expires } = params;

    if (httpOnly) {
      cookies.push('httpOnly');
    }

    if (secure) {
      cookies.push('secure');
    }

    if (sameSite) {
      cookies.push(`samesite=${sameSite}`);
    }

    if (path) {
      cookies.push(`path=${path}`);
    }

    if (maxAge != null) {
      cookies.push(`max-age=${maxAge}`);
    }

    if (expires) {
      cookies.push(`expires=${expires.toUTCString()}`);
    }

    allCookie.push(cookies.join(';'))
  }

  res.setHeader('Set-Cookie', allCookie);
}
