import { ServerResponse } from 'http';

export function addCors(res: ServerResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}