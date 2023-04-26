import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { z } from 'zod';
import { makeUpdateUserUseCase } from '@/use-case/factories/make-update-user';

interface UpdateRequestParams extends RouteGenericInterface {
    Params: {
        id: string;
    };
}

export async function update(request: FastifyRequest, response: FastifyReply) {

	const userUpdateParamsSchema = z.object({
		userId: z.string().uuid()
	});


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
		nascimento: z.string()
	});

	try {
		const { userId } = userUpdateParamsSchema.parse(request.params);

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
		} = userUpdateBodySchema.parse(request.body);

		const updateUserUseCase = makeUpdateUserUseCase();

		const updatedUser = await updateUserUseCase.execute({
			id: userId,
			nome,
			email,
			senha_hash: senha,
			cpf,
			telefone,
			cep,
			estado,
			cidade,
			rua,
			numero,
			nascimento
		});

		return response.status(200).send({
			user: updatedUser
		});
	} catch (error) {
		return response.status(400).send({
			message: error//.message
		});
	}
}
