import { ServerResponse } from "http";

export const sendResponse = (res: ServerResponse, statusCode: number, data: unknown) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

export const sendError = (res: ServerResponse, statusCode: number, reason: string) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ reason }));
}