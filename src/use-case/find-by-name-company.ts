import { Schedule } from '@prisma/client';
import { CompaniesRepository } from '@repositories/companies-repository';

interface FindSchedulesByCompanyNameUseCaseRequest {
	nomeFantasia: string;
}

interface FindSchedulesByCompanyNameUseCaseResponse {
	schedules: Schedule[];
}

export class FindSchedulesByCompanyNameUseCase {
	constructor(private companyRepository: CompaniesRepository) { }

	async execute({
		nomeFantasia
	}: FindSchedulesByCompanyNameUseCaseRequest): Promise<FindSchedulesByCompanyNameUseCaseResponse> {

		const schedules = await this.companyRepository.findSchedulesByCompanyNomeFantasia(nomeFantasia);

		return { schedules };
	}
}