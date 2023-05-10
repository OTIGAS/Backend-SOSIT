import { UsersRepository } from '@repositories/users-repository';
import { UsersNotFoundError } from './errors/users-not-found';
import { User } from '@prisma/client';

interface DeleteUserUseCaseRequest {
    userId: string;
}

interface DeleteUserUseCaseResponse {
    user: User;
}

export class DeleteUserUseCase {
    constructor(private userRepository: UsersRepository) { }

    async execute({ userId }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {

        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new UsersNotFoundError();
        }

        await this.userRepository.delete(userId);

        return { user };
    }
}