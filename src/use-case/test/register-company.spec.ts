import { expect, describe, it } from "vitest"
import { RegisterUserUseCase } from "../register-user"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"

describe("Caso de Uso, Cadastro", () => {
    it("should hash user password upon registration", async () => {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUsersUseCase = new RegisterUserUseCase(prismaUsersRepository)


    })
})