import pkg from 'pg';
const { Client } = pkg;
import 'dotenv/config';

import { PrismaClient } from '@prisma/client'

export const dbClient = new Client({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
});

export const prisma = new PrismaClient()