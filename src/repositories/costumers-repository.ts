import { Prisma, Costumer } from '@prisma/client';

export interface CostumersRepository {
    create(data: Prisma.CostumerCreateInput): Promise<Costumer>
    delete(costumerId: string): Promise<Costumer>
    update(data: Prisma.CostumerUpdateInput): Promise<Costumer>
    findByCPF(cpf: string): Promise<Costumer | null>
    findByEmail(email: string): Promise<Costumer | null>
    findById(id: string): Promise<Costumer | null>
    getAll(): Promise<Costumer[]>
} 