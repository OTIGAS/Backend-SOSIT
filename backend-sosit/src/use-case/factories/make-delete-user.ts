import { PrismaUsersRepository } from '@repositories/prisma/prisma-user-repository';
import { DeleteUserUseCase } from '../delete-user';

export function makeDeleteUserUseCase() {

    const usersRepository = new PrismaUsersRepository();
    const useCase = new DeleteUserUseCase(usersRepository);

    return useCase;
}