import { todoController } from '#controllers/todo/index.ts';
import { Route } from '#routes/types.ts';

export const todoRoutes: Route = {
  create: {
    POST: todoController.create
  },
  all: {
    GET: todoController.all,
  },
  update: {
    POST: todoController.update
  }
}