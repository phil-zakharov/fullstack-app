import { prisma } from '../../config/db.ts';
import type { Route } from '../types.ts'

const create: Route = async (req, res) => {
  const result = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  });

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ data: result }));
}

export const user = {
  create,
}