import { PrismaCompaniesRepository } from '@/repositories/prisma/prisma-company-repository';
import { GetAllCompanyProfileUseCase } from '../get-all-companies';

export function makeGetAllCompaniesProfileUseCase() {

    const companiesRepository = new PrismaCompaniesRepository();
    const useCase = new GetAllCompanyProfileUseCase(companiesRepository);

    return useCase;
}