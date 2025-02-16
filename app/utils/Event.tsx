import Gear from '@/app/utils/Gear';
import Technician from '@/app/utils/Technician';


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

    constructor(args: {
        name: string,
        location: string,
        client: string,
        manager: Technician,

        startDate: string,
        endDate: string,

        quotePrice: number,
        invoicePrice: number,

        gear: Gear[] | undefined,
        techs: Technician[] | undefined,
        techRates: number[] | undefined,
        techsPaid: boolean[] | undefined,

        dateQuoted: string,
        dateConfirmed: string,
        dateInvoiced: string,
        datePaid: string,

        subrentals: string[] | undefined,
        subrentalAmounts: number[] | undefined,

        otherCosts: string[] | undefined,
        otherCostsAmount: number[] | undefined,
                
        outbounded: boolean,
        outboundNotes: string,
        inbounded: boolean,
        inboundNotes: string,

        key: string
    }) {
        this.name = args.name;
        this.location = args.location;
        this.client = args.client;
        this.manager = new Technician(args.manager);

        this.startDate = args.startDate;
        this.endDate = args.endDate;

        this.quotePrice = args.quotePrice;
        this.invoicePrice = args.invoicePrice

        this.gear = args.gear ? args.gear.map(gearItem => new Gear(gearItem)) : [];
        this.techs = args.techs ? args.techs.map(tech => new Technician(tech)) : [];
        this.techRates = args.techRates || [];
        this.techsPaid = args.techsPaid || [];

        this.dateQuoted = args.dateQuoted;
        this.dateConfirmed = args.dateConfirmed;
        this.dateInvoiced = args.dateInvoiced;
        this.datePaid = args.datePaid; 

        this.subrentals = args.subrentals || [];
        this.subrentalAmounts = args.subrentalAmounts || [];

        this.otherCosts = args.otherCosts || [];
        this.otherCostsAmount = args.otherCostsAmount || [];
        
        this.outbounded = args.outbounded;
        this.outboundNotes= args.outboundNotes;
        this.inbounded = args.inbounded;
        this.inboundNotes = args.inboundNotes;

        this.key = args.key;
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