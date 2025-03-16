import { IncomingMessage, ServerResponse } from 'http';

export type Controller = Record<
  string,
  (req: IncomingMessage, res: ServerResponse) => void
>;
