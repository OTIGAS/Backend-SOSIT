import { Prisma, Company, Schedule } from '@prisma/client';

export interface CompaniesRepository {
    create(data: Prisma.CompanyCreateInput): Promise<Company>
    delete(companyId: string): Promise<Company>
    update(data: Prisma.CompanyCreateInput): Promise<Company>
    findByCNPJ(cnpj: string): Promise<Company | null>
    findByEmail(email: string): Promise<Company | null>
    findById(id: string): Promise<Company | null>
    getAll(): Promise<Company[]>

    findSchedulesByCompanyNomeFantasia(nomeFantasia: string): Promise<Schedule[]>
}