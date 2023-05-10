import { PrismaCompaniesRepository } from '@repositories/prisma/prisma-company-repository';
import { DeleteCompanyUseCase } from '../delete-company';

export function makeDeleteCompanyUseCase() {

    const companiesRepository = new PrismaCompaniesRepository();
    const useCase = new DeleteCompanyUseCase(companiesRepository);

    return useCase;
}