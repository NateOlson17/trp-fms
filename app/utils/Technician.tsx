export default class Technician {
    name: string;
    contact: string;
    role: string;
    key: string;

    constructor(
        name: string, 
        contact: string, 
        role: string,
        key: string
    ) {
        this.name = name;
        this.contact = contact;
        this.role = role;
        this.key = key;
    }
}