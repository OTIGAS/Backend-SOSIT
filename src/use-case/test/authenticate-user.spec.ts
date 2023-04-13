import { expect, describe, it, beforeEach } from "vitest"
import { hash } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { AuthenticateUserUseCase } from "../authenticate-user"
import { InvalidCredencialsError } from "../errors/invalid-credencials-error"

let userRepository: InMemoryUsersRepository
let authenticateUsersUseCase: AuthenticateUserUseCase

beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    authenticateUsersUseCase = new AuthenticateUserUseCase(userRepository)
})

describe("Authenticate User", () => {
    it("should be able to authenticate", async () => {

        await userRepository.create({
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

        const { user } = await authenticateUsersUseCase.execute({
            email: "email@gmail.com",
            senha: "123456",
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("should be able to authenticate with wrong email", async () => {

        expect(() =>
            authenticateUsersUseCase.execute({
                email: "email@gmail.com",
                senha: "123456",
            })
        ).rejects.toBeInstanceOf(InvalidCredencialsError)
    })

    it("should be able to authenticate with wrong password", async () => {

        await userRepository.create({
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

        expect(() =>
            authenticateUsersUseCase.execute({
                email: "email@gmail.com",
                senha: "123123",
            })
        ).rejects.toBeInstanceOf(InvalidCredencialsError)
    })
})