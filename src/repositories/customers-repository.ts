import { Prisma, Customer } from '@prisma/client';

export interface CustomersRepository {
    create(data: Prisma.CustomerCreateInput): Promise<Customer>
    delete(customerId: string): Promise<Customer>
    update(data: Prisma.CustomerUpdateInput): Promise<Customer>
    findByCPF(cpf: string): Promise<Customer | null>
    findByEmail(email: string): Promise<Customer | null>
    findById(id: string): Promise<Customer | null>
    getAll(): Promise<Customer[]>
} 