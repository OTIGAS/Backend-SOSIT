import { expect, describe, it, beforeEach } from "vitest"
import { hash } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { InvalidCredencialsError } from "../errors/invalid-credencials-error"
import { GetUserProfileUseCase } from "../get-user-profile"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

let userRepository: InMemoryUsersRepository
let getUserProfileUseCase: GetUserProfileUseCase

beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(userRepository)
})

describe("Get User Profile Use Case", () => {

    it("should be able to get user profile", async () => {

        const createdUser = await userRepository.create({
            nome: "Nome",
            email: "email@gmail.com",
            senha_hash: await hash("123456", 6),
            cpf: "000.000.000-00",
            telefone: "00 0 0000-0000",
            cep: "00000-000",
            estado: "Estado",
            cidade: "Cidade",
            rua: "Rua",
            numero: "123",
            nascimento: "00/00/0000"
        })

        const { user } = await getUserProfileUseCase.execute({
            userId: createdUser.id
        })

        expect(user.id).toEqual(expect.any(String))
        expect(user.nome).toEqual("Nome")
    })

    it("should be able to get user profile with wrong id", async () => {

        expect(() =>
            getUserProfileUseCase.execute({
                userId: "non-existing-id"
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})