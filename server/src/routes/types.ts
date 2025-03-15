import http from 'node:http';

export type Route = (
  request: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>
) => void;
