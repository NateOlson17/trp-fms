export default class Technician {
    name: string;
    contact: string;
    level: string;

    constructor(_name: string, _contact: string, _level: string) {
        this.name = _name;
        this.contact = _contact;
        this.level = _level;
    }
}