import { PrismaCompaniesRepository } from '@repositories/prisma/prisma-company-repository';
import { UpdateCompanyUseCase } from '../update-company';

export function makeUpdateCompanyUseCase() {

	const companyRepository = new PrismaCompaniesRepository();
	const useCase = new UpdateCompanyUseCase(companyRepository);

	return useCase;
}