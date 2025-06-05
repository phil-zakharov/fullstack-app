import { prisma } from '#config/db.ts';
import { getBody } from '#utils/body.ts';
import { sendResponse } from '#utils/response.ts';
import { Prisma } from '@prisma/client';
import { IncomingMessage, ServerResponse } from 'http';

async function getAllTodos(req: IncomingMessage, res: ServerResponse) {
  const todos = await prisma.todo.findMany();
  console.log(' todos:', todos);
  sendResponse(res, 200, todos);
}

async function createTodo(req: IncomingMessage, res: ServerResponse) {
  const body = await getBody<Prisma.TodoCreateInput>(req);

  await prisma.todo.create({ data: body });

  sendResponse(res, 200, 'created');
}

export const todoController = {
  getAllTodos,
  createTodo,
};
