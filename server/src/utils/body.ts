import { IncomingMessage } from 'http';

export async function getBody<T extends object>(
  req: IncomingMessage,
): Promise<T> {
  return new Promise((res, rej) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body);
        res(parsedBody);
      } catch (error) {
        rej('invalid body');
      }
    });
  });
}
