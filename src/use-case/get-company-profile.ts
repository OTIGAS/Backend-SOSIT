import { Company } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { CompaniesRepository } from '@/repositories/companies-repository';

interface GetCompanyProfileUseCaseRequest {
    companyId: string;
}

interface GetCompanyProfileUseCaseResponse {
    company: Company;
}

export class GetCompanyProfileUseCase {
	constructor(private companiesRepository: CompaniesRepository) { }

	async execute({
		companyId,
	}: GetCompanyProfileUseCaseRequest): Promise<GetCompanyProfileUseCaseResponse> {
		const company = await this.companiesRepository.findById(companyId);

		if (!company) {
			throw new ResourceNotFoundError();
		}

		return {
			company
		};
	}
}