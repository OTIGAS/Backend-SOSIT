import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { UsersRepository } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository {

	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data,
		});
		return user;
	}

	async update(data: Prisma.UserUpdateInput): Promise<User> {
		const user = await prisma.user.update({
			where: { id: data.id as string },
			data,
		});
		return user;
	}

	async findByCPF(cpf: string) {
		const user = await prisma.user.findUnique({
			where: {
				cpf
			}
		});
		return user;
	}

	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});
		return user;
	}

	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id
			}
		});
		return user;
	}
}