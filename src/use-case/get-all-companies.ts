import { Company } from '@prisma/client';
import { CompaniesNotFoundError } from './errors/companies-not-found';
import { CompaniesRepository } from '@repositories/companies-repository';

interface GetCompanyProfileUseCaseResponse {
    companies: Company[];
}

export class GetAllCompanyProfileUseCase {
	constructor(private companiesRepository: CompaniesRepository) { }

	async execute(): Promise<GetCompanyProfileUseCaseResponse> {
		const companies = await this.companiesRepository.getAll();

		if (!companies) {
			throw new CompaniesNotFoundError();
		}

		return {
			companies
		};
	}
}