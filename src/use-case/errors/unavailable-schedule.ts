export class UnavailableSchedule extends Error {
    constructor() {
        super('Horário indisponível.');
    }
}