export class ScheduleAlreadyExistsError extends Error {
    constructor() {
        super('Nome ja cadastrado.');
    }
}