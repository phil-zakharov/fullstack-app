import { prisma } from '#config/db.ts';
import { Prisma } from '@prisma/client';

async function create(body: Prisma.UserCreateInput, hashedPassword: string) {
  return await prisma.user.create({
    data: Prisma.validator<Prisma.UserCreateInput>()({ ...body, password: hashedPassword }),
  });
}

export const UserService = {
  create
};
