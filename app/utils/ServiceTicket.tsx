export default class ServiceTicket {
    qty: number;
    reason: string;
    notes: string;

    constructor(
        _qty: number,
        _reason: string,
        _notes: string
    ) {
        this.qty = _qty;
        this.reason = _reason;    
        this.notes = _notes;
    }
}