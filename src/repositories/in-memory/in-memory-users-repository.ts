import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {

    public items: User[] = [];

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: randomUUID(),
            nome: data.nome,
            email: data.email,
            senha_hash: data.senha_hash,
            cpf: data.cpf,
            telefone: data.telefone,
            cep: data.cep,
            estado: data.estado,
            cidade: data.cidade,
            rua: data.rua,
            numero: data.numero,
            nascimento: data.nascimento,
            criado_em: new Date(),
        }

        this.items.push(user);

        return user
    }

    async findByCPF(cpf: string): Promise<User | null> {
        const user = this.items.find((item) => item.cpf === cpf)

        if (!user) {
            return null;
        }

        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find((item) => item.email === email)

        if (!user) {
            return null;
        }

        return user
    }

    async findById(id: string): Promise<User | null> {
        const user = this.items.find((item) => item.id === id)

        if (!user) {
            return null;
        }

        return user
    }
}