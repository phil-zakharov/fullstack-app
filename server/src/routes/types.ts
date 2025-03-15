/** @format */

import http from 'node:http';

export type Route = (
  request: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>,
) => void;

export type NestedRoute = (
  path: string[],
  request: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>,
) => void;
