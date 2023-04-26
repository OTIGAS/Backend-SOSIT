import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { z } from 'zod';
import { makeUpdateUserUseCase } from '@/use-case/factories/make-update-user';

interface UpdateRequestParams extends RouteGenericInterface {
    Params: {
        id: string;
    };
}

export async function update(request: FastifyRequest<UpdateRequestParams>, response: FastifyReply) {
    const id = request.params.id;

    const userUpdateBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        senha: z.string().min(6),
        cpf: z.string(),
        telefone: z.string(),
        cep: z.string(),
        estado: z.string(),
        cidade: z.string(),
        rua: z.string(),
        numero: z.string(),
        nascimento: z.string(),
        criado_em: z.string()
    });

    try {
        const {
            nome,
            email,
            senha,
            cpf,
            telefone,
            cep,
            estado,
            cidade,
            rua,
            numero,
            nascimento,
            criado_em
        } = userUpdateBodySchema.parse(request.body);

        const updateUserUseCase = makeUpdateUserUseCase();

        const updatedUser = await updateUserUseCase.execute({
            id,
            nome,
            email,
            senha,
            cpf,
            telefone,
            cep,
            estado,
            cidade,
            rua,
            numero,
            nascimento,
            criado_em
        });

        return response.status(200).send({
            user: updatedUser
        });
    } catch (error) {
        return response.status(400).send({
            message: error
        });
    }
}
