import Gear from './Gear';
import Technician from './Technician';


export default class Event {
    name: string;
    location: string;
    client: string;
    manager: Technician;

    startDate: string;
    endDate: string;

    quotePrice: number;
    invoicePrice: number;

    gear: Gear[];
    techs: Technician[];
    techRates: number[];
    techsPaid: boolean[];

    dateQuoted: string;
    dateConfirmed: string;
    dateInvoiced: string;
    datePaid: string;

    subrentals: string[];
    subrentalAmounts: number[];

    otherCosts: string[];
    otherCostsAmount: number[];
    
    outbounded: boolean;
    outboundNotes: string;
    inbounded: boolean;
    inboundNotes: string;

    key: string;

    constructor(
        name: string,
        location: string,
        client: string,
        manager: Technician,

        startDate: string,
        endDate: string,

        quotePrice: number,
        invoicePrice: number,

        gear: Gear[],
        techs: Technician[],
        techRates: number[],
        techsPaid: boolean[],

        dateQuoted: string,
        dateConfirmed: string,
        dateInvoiced: string,
        datePaid: string,

        subrentals: string[],
        subrentalAmounts: number[],

        otherCosts: string[],
        otherCostsAmount: number[],
                
        outbounded: boolean,
        outboundNotes: string,
        inbounded: boolean,
        inboundNotes: string,

        key: string
    ) {
        this.name = name;
        this.location = location;
        this.client = client;
        this.manager = manager;

        this.startDate = startDate;
        this.endDate = endDate;

        this.quotePrice = quotePrice;
        this.invoicePrice = invoicePrice

        this.gear = gear;
        this.techs = techs;
        this.techRates = techRates;
        this.techsPaid = techsPaid;

        this.dateQuoted = dateQuoted;
        this.dateConfirmed = dateConfirmed;
        this.dateInvoiced = dateInvoiced;
        this.datePaid = datePaid; 

        this.subrentals = subrentals;
        this.subrentalAmounts = subrentalAmounts;

        this.otherCosts = otherCosts;
        this.otherCostsAmount = otherCostsAmount;
        
        this.outbounded = outbounded;
        this.outboundNotes= outboundNotes;
        this.inbounded = inbounded;
        this.inboundNotes = inboundNotes;

        this.key = key;
    }


    sendQuote() {
        //pack into pdf and show to user, then prompt to send to client, which opens an email or text window prefilled
    }

    sendInvoice() {
        //fill info based on logged in manager
        //modify quote slightly and show to user, prompt changes then prompt sending
    }

    submitOutbounding() {
        //create checklist for outbound gear with notes, user checks and leaves note and that info is stored as an object member variable Outbounding
    }

    submitInbounding() {
        
    }

}