import { prisma } from '#config/db.ts';
import { getBody } from '#utils/body.ts';
import { sendResponse } from '#utils/response.ts';
import { Prisma } from '@prisma/client';
import { IncomingMessage, ServerResponse } from 'http';

async function all(req: IncomingMessage, res: ServerResponse) {
  const todos = await prisma.todo.findMany({ orderBy: { id: 'asc' }} );
  sendResponse(res, 200, todos);
}

async function create(req: IncomingMessage, res: ServerResponse) {
  const body = await getBody<Prisma.TodoCreateInput>(req);

  await prisma.todo.create({ data: body });

  sendResponse(res, 200, 'created');
}

async function update(req:IncomingMessage, res: ServerResponse) {
  const body = await getBody<Prisma.TodoCreateManyInput>(req);
  console.log(' body:', body);

  await prisma.todo.update({ where: { id: body.id }, data: body })

  sendResponse(res, 200, 'updated')
}

export const todoController = {
  all,
  create,
  update,
};
