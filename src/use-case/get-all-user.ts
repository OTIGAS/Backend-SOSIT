import { UsersRepository } from '@repositories/users-repository';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UsersNotFoundError } from './errors/users-not-found'

interface GetUserProfileUseCaseResponse {
    users: User[];
}

export class GetAllUserProfileUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute(): Promise<GetUserProfileUseCaseResponse> {
        const users = await this.usersRepository.getAll();

        if (!users) {
            throw new UsersNotFoundError();
        }

        return {
            users
        };
    }
}