export default class ServiceTicket {
    qty: number;
    notes: string;

    constructor(
        _qty: number,
        _notes: string,
    ) {
        this.qty = _qty;
        this.notes = _notes;    
    }
}