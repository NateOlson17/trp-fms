export default class ServiceTicket {
    qty: number;
    date: string;
    notes: string;

    constructor(
        qty: number,
        date: string,
        notes: string,
    ) {
        this.qty = qty;
        this.date = date;
        this.notes = notes;    
    }
}