import { PrismaCompaniesRepository } from '@/repositories/prisma/prisma-company-repository';
import { GetCompanyProfileUseCase } from '../get-company-profile';

export function makeGetCompanyProfileUseCase() {

	const companyRepository = new PrismaCompaniesRepository();
	const useCase = new GetCompanyProfileUseCase(companyRepository);

	return useCase;
}