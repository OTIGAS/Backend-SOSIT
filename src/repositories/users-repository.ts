import { Prisma, User } from '@prisma/client';

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    delete(userId: string): Promise<User>
    update(data: Prisma.UserUpdateInput): Promise<User>
    findByCPF(cpf: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    getAll(): Promise<User[]>
} 