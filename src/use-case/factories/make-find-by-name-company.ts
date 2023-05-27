import { FindSchedulesByCompanyNameUseCase } from '../find-by-name-company';
import { PrismaCompaniesRepository } from '@repositories/prisma/prisma-company-repository';

export function makeFindSchedulesByCompanyNameUseCase() {

	const companiesRepository = new PrismaCompaniesRepository();
	const useCase = new FindSchedulesByCompanyNameUseCase(companiesRepository);

	return useCase;
}