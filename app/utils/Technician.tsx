export default class Technician {
    name: string;
    contact: string;
    role: string;
    key: string;

    constructor(args: {
        name: string, 
        contact: string, 
        role: string,
        key: string
    }) {
        this.name = args.name;
        this.contact = args.contact;
        this.role = args.role;
        this.key = args.key;
    }
}