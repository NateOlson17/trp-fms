export default class ServiceTicket {
    qty: number;
    date: number;
    location: string;
    notes: string;

    constructor(args: {
        qty: number,
        date: number,
        location: string,
        notes: string
    }) {
        this.qty = args.qty;
        this.date = args.date;
        this.location = args.location;
        this.notes = args.notes;    
    }
}