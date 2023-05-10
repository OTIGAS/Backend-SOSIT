export class SchedulesNoFoundError extends Error {
    constructor() {
        super('Nenhum Agenda encotrada.');
    }
}