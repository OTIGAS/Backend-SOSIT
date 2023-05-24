import { CompaniesRepository } from '@repositories/companies-repository';
import { CompaniesNotFoundError } from './errors/companies-not-found';
import { Company } from '@prisma/client';

interface DeleteCompanyUseCaseRequest {
    companyId: string;
}

interface DeleteCompanyUseCaseResponse {
    company: Company;
}

export class DeleteCompanyUseCase {
	constructor(private costumerRepository: CompaniesRepository) { }

	async execute({ companyId }: DeleteCompanyUseCaseRequest): Promise<DeleteCompanyUseCaseResponse> {

		const company = await this.costumerRepository.findById(companyId);

		if (!company) {
			throw new CompaniesNotFoundError();
		}

		await this.costumerRepository.delete(companyId);

		return { company };
	}
}