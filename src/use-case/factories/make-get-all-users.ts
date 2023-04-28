import { PrismaUsersRepository } from '@repositories/prisma/prisma-user-repository';
import { GetAllUserProfileUseCase } from '../get-all-user';

export function makeGetAllUserProfileUseCase() {

    const usersRepository = new PrismaUsersRepository();
    const useCase = new GetAllUserProfileUseCase(usersRepository);

    return useCase;
}