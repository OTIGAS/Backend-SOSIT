import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredencialsError } from "./errors/invalid-credencials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUserUseCaseRequest {
    email: string;
    senha: string;
}

interface AuthenticateUserUseCaseResponse {
    user: User;
}

export class AuthenticateUserUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        email, senha
    }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredencialsError()
        }

        const doesPasswordMatches = await compare(senha, user.senha_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredencialsError()
        }

        return {
            user
        }
    }
}