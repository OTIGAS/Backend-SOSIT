import { prisma } from '@lib/prisma';
import { Prisma } from '@prisma/client';
import { CostumersRepository } from '../costumers-repository';

export class PrismaCostumersRepository implements CostumersRepository {

	async create(data: Prisma.CostumerCreateInput) {
		const costumer = await prisma.costumer.create({
			data,
		});
		return costumer;
	}

	async update(data: Prisma.CostumerUpdateInput) {
		const costumer = await prisma.costumer.update({
			where: { id: data.id as string },
			data,
		});
		return costumer;
	}

	async findByCPF(cpf: string) {
		const costumer = await prisma.costumer.findUnique({
			where: {
				cpf
			}
		});
		return costumer;
	}

	async findByEmail(email: string) {
		const costumer = await prisma.costumer.findUnique({
			where: {
				email
			}
		});
		return costumer;
	}

	async findById(id: string) {
		const costumer = await prisma.costumer.findUnique({
			where: {
				id
			}
		});
		return costumer;
	}

	async getAll() {
		const costumers = await prisma.costumer.findMany();
		return costumers;
	}

	async delete(costumerId: string) {
		const costumer = await prisma.costumer.delete({
			where: { id: costumerId }
		});
		return costumer;
	}
}