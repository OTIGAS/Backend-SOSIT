import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { InvalidCredencialsError } from '@/use-case/errors/invalid-credencials-error';
import { makeGetCompanyProfileUseCase } from '@/use-case/factories/make-get-company-profile';
import { z } from 'zod';

export async function get(request: FastifyRequest, response: FastifyReply) {

    const companyGetParamsSchema = z.object({
        companyId: z.string().uuid()
    })

    try {
        const { companyId } = companyGetParamsSchema.parse(request.params)

        const getCompanyProfileUseCase = makeGetCompanyProfileUseCase();

        const { company } = await getCompanyProfileUseCase.execute({ companyId });

        return response.status(200).send({ company });

    } catch (err) {
        if (err instanceof InvalidCredencialsError) {
            return response.status(400).send({
                message: err.message
            });
        }
        else {

        }
        throw err;
    }
}