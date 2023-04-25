import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository';
import { AuthenticateUserUseCase } from '../authenticate-user';

export function makeAuthenticateUserUseCase() {

    const usersRepository = new PrismaUsersRepository();
    const useCase = new AuthenticateUserUseCase(usersRepository);

    return useCase;
}