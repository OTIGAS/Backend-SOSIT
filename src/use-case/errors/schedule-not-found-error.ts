export class ScheduleNotFoundError extends Error {
	constructor() {
		super('Agenda não encontrada.');
	}
}