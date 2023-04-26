import { makeGetCompanyProfileUseCase } from "@/use-case/factories/make-get-company-profile";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, response: FastifyReply) {

    const getCompanyProfile = makeGetCompanyProfileUseCase()

    const { company } = await getCompanyProfile.execute({
        companyId: request.user.sub
    })

    return response.status(200).send({
        company: {
            ...company,
            senha_hash: undefined
        }
    })
}