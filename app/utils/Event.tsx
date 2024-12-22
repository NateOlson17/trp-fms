import Gear from './Gear';
import Technician from './Technician';


//ADD SUBRENTAL OBJECT AS MEMBER VAR
//add outbound/inbound report status saved as member variable
//add member var for "issuer/manager" as Technician object


export default class Event {
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    price: number;
    client: string;
    gear: Gear[];
    techs: Technician[];
    techRates: number[];
    techsPaid: boolean[];
    paid: boolean;
    quoted: boolean;
    invoiced: boolean;
    confirmed: boolean;

    constructor(
        _name: string,
        _location: string,
        _startDate: string,
        _endDate: string,
        _client: string, 
    ) {
        this.name = _name;
        this.location = _location;
        this.startDate = _startDate;
        this.endDate = _endDate;
        this.client = _client;
        this.price = 0;
        this.gear =  [];
        this.techs = [];
        this.techRates = [];
        this.techsPaid = [];
        this.paid = false;
        this.quoted = false;
        this.invoiced = false;
        this.confirmed = false;
    }


    sendQuote() {
        this.quoted = true;
        //pack into pdf and show to user, then prompt to send to client, which opens an email or text window prefilled
    }

    sendInvoice() {
        this.invoiced = true;
        //modify quote slightly and show to user, prompt changes then prompt sending
    }

    submitOutbounding() {
        //create checklist for outbound gear with notes, user checks and leaves note and that info is stored as an object member variable Outbounding
    }

    submitInbounding() {
        
    }

}