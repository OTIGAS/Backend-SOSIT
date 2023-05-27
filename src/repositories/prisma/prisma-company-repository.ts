import { prisma } from '@lib/prisma';
import { Company, Prisma, Schedule } from '@prisma/client';
import { CompaniesRepository } from '../companies-repository';

export class PrismaCompaniesRepository implements CompaniesRepository {

	async findSchedulesByCompanyNomeFantasia(nomeFantasia: string) {
		const companies = await prisma.company.findMany({
			where: {
				nome_fantasia: nomeFantasia,
			},
			include: {
				schedule: true,
			},
		});

		const schedules: Schedule[] = [];

		companies.forEach((company) => {
			if (company.schedule) {
				schedules.push(...company.schedule);
			}
		});

		return schedules;
	}

	async create(data: Prisma.CompanyCreateInput) {
		const company = await prisma.company.create({
			data,
		});
		return company;
	}

	async update(data: Prisma.CompanyCreateInput): Promise<Company> {
		const company = await prisma.company.update({
			where: { id: data.id },
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

	async getAll(): Promise<Company[]> {
		const companies = await prisma.company.findMany();
		return companies;
	}

	async getByCompany(query: string): Promise<Company[]> {
		const companies = await prisma.company.findMany({
			where: {
				nome_fantasia: {
					contains: query,
				},
			},
		});

		return companies;
	}


	async delete(companyId: string) {
		const company = await prisma.company.delete({
			where: { id: companyId }
		});
		return company;
	}
}