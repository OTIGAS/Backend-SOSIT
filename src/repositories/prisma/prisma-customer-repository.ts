import { prisma } from '@lib/prisma';
import { Prisma } from '@prisma/client';
import { CustomersRepository } from '../customers-repository';

export class PrismaCustomersRepository implements CustomersRepository {

	async create(data: Prisma.CustomerCreateInput) {
		const customer = await prisma.customer.create({
			data,
		});
		return customer;
	}

	async update(data: Prisma.CustomerUpdateInput) {
		const customer = await prisma.customer.update({
			where: { id: data.id as string },
			data,
		});
		return customer;
	}

	async findByCPF(cpf: string) {
		const customer = await prisma.customer.findUnique({
			where: {
				cpf
			}
		});
		return customer;
	}

	async findByEmail(email: string) {
		const customer = await prisma.customer.findUnique({
			where: {
				email
			}
		});
		return customer;
	}

	async findById(id: string) {
		const customer = await prisma.customer.findUnique({
			where: {
				id
			}
		});
		return customer;
	}

	async getAll() {
		const customers = await prisma.customer.findMany();
		return customers;
	}

	async delete(customerId: string) {
		const customer = await prisma.customer.delete({
			where: { id: customerId }
		});
		return customer;
	}

}