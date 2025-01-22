export default class ServiceTicket {
    qty: number;
    date: string;
    notes: string;

    constructor(args: {
        qty: number,
        date: string,
        notes: string,
    }) {
        this.qty = args.qty;
        this.date = args.date;
        this.notes = args.notes;    
    }
}