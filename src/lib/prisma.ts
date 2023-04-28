//Conexão com o banco de dados
import { PrismaClient } from '@prisma/client';
import { env } from '../env';

export const prisma = new PrismaClient({
	log: env.NODE_ENV === 'dev' ? ['query'] : []
});