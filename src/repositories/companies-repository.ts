import { Prisma, Company } from '@prisma/client';

export interface CompaniesRepository {
    create(data: Prisma.CompanyCreateInput): Promise<Company>
    findByCNPJ(cnpj: string): Promise<Company | null>
    findByEmail(email: string): Promise<Company | null>

}