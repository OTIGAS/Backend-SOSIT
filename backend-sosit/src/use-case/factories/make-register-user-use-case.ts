import { PrismaUsersRepository } from '@repositories/prisma/prisma-user-repository';
import { RegisterUserUseCase } from '../register-user';

export function makeRegisterUserUseCase() {

	const usersRepository = new PrismaUsersRepository();
	const useCase = new RegisterUserUseCase(usersRepository);

	return useCase;
}