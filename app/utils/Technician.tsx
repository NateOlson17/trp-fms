export default class Technician {
    name: string;
    contact: string;
    role: string;


    constructor(
        name: string, 
        contact: string, 
        role: string
    ) {
        this.name = name;
        this.contact = contact;
        this.role = role;
    }
}