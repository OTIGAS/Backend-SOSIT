export class CommitemntAlreadyExistingAtThisTime extends Error {
    constructor() {
        super("Compromisso já existente neste horário");
    }
}
