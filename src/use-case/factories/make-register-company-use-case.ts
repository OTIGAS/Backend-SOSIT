import { PrismaCompaniesRepository } from '../../repositories/prisma/prisma-company-repository';
import { RegisterCompanyUseCase } from '../register-company';

export function makeRegisterCompanyUseCase() {

	const companiesRepository = new PrismaCompaniesRepository();
	const useCase = new RegisterCompanyUseCase(companiesRepository);

	return useCase;
}