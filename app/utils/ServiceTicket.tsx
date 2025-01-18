export default class ServiceTicket {
    qty: number;
    notes: string;

    constructor(
        qty: number,
        notes: string,
    ) {
        this.qty = qty;
        this.notes = notes;    
    }
}