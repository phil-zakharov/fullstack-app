import { compare, hash } from 'bcrypt'

const SALT = 5;

export async function hashPassword(pass: string) {
  return await hash(pass, SALT)
}

export async function comparePassword(pass: string, hash: string) {
  return await compare(pass, hash)
}