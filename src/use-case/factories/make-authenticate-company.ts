import { AuthenticateCompanyUseCase } from '../authenticate-campany';
import { PrismaCompaniesRepository } from '@repositories/prisma/prisma-company-repository';

export function makeAuthenticateCompanyUseCase() {

	const companyRepository = new PrismaCompaniesRepository();
	const useCase = new AuthenticateCompanyUseCase(companyRepository);

	return useCase;
}