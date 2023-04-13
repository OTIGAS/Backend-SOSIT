import { prisma } from '@/lib/prisma';
import { Company, Prisma } from '@prisma/client';
import { CompaniesRepository } from '../companies-repository';

export class PrismaCompaniesRepository implements CompaniesRepository {

	async create(data: Prisma.CompanyCreateInput) {
		const company = await prisma.company.create({
			data,
		});
		return company;
	}

	async findByCNPJ(cnpj: string) {
		const company = await prisma.company.findUnique({
			where: {
				cnpj
			}
		});
		return company;
	}

	async findByEmail(email: string) {
		const company = await prisma.company.findUnique({
			where: {
				email
			}
		});
		return company;
	}

	async findById(id: string): Promise<Company | null> {
		const company = await prisma.company.findUnique({
			where: {
				id
			}
		});
		return company;
	}
}