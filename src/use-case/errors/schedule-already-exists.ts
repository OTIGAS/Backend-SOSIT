export class ScheduleAlreadyExistsError extends Error {
    constructor() {
        super('Agenda já cadastrado.')
    }
}