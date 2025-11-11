import { push, ref, remove } from 'firebase/database';
import rtdb from '@/app/rtdb_config';

import Gear from '@/app/utils/Gear';
import Technician from '@/app/utils/Technician';


export type Cost = {
	name: string,
	amount: number,
	notes: string
}

export default class Event {
	name?: string;
	location?: string;
	client?: string;
	manager?: Technician;
	contact?: string;
	contactInfo?: string;

	startDate: string;
	endDate: string;

	quotePrice: number | undefined;
	invoicePrice: number | undefined;

	gear: Gear[] | undefined;
	techs: {tech: Technician, rate: number | undefined, paid: boolean | undefined}[] | undefined;

	dateQuoted: string | undefined;
	dateConfirmed: string | undefined;
	dateInvoiced: string | undefined;
	datePaid: string | undefined;

	subrentals: Cost[] | undefined;

	otherCosts: Cost[] | undefined;
	
	outbounded: boolean | undefined;
	outboundNotes: string | undefined;
	inbounded: boolean | undefined;
	inboundNotes: string | undefined;

	key: string | undefined;

	constructor(args: {
		name?: string,
		location?: string,
		client?: string,
		manager?: Technician,
		contact?: string,
		contactInfo?: string,


		startDate: string,
		endDate: string,

		quotePrice?: number,
		invoicePrice?: number,

		gear?: Gear[],
		techs?: {tech: Technician, rate: number | undefined, paid: boolean | undefined}[],

		dateQuoted?: string,
		dateConfirmed?: string,
		dateInvoiced?: string,
		datePaid?: string,

		subrentals?: Cost[],

		otherCosts?: Cost[],
						
		outbounded?: boolean,
		outboundNotes?: string,
		inbounded?: boolean,
		inboundNotes?: string,

		key?: string
	}) {
		this.name = args.name;
		this.location = args.location;
		this.client = args.client;
		this.manager = args.manager ? new Technician(args.manager) : undefined;
		this.contact = args.contact;
		this.contactInfo = args.contactInfo;

		this.startDate = args.startDate;
		this.endDate = args.endDate;

		this.quotePrice = args.quotePrice;
		this.invoicePrice = args.invoicePrice;

		this.gear = args.gear ? args.gear.map(gearItem => new Gear(gearItem)) : undefined;
		this.techs = args.techs ? args.techs.map(t => ({...t, tech: new Technician(t.tech)})) : undefined;


		this.dateQuoted = args.dateQuoted;
		this.dateConfirmed = args.dateConfirmed;
		this.dateInvoiced = args.dateInvoiced;
		this.datePaid = args.datePaid; 

		this.subrentals = args.subrentals;

		this.otherCosts = args.otherCosts;
		
		this.outbounded = args.outbounded;
		this.outboundNotes= args.outboundNotes;
		this.inbounded = args.inbounded;
		this.inboundNotes = args.inboundNotes;

		this.key = args.key;
	}

	pushToDB = () => {
		push(ref(rtdb, 'EventContainer/'), 
			{...Object.fromEntries(Object.entries(this).filter(entry => entry[1] && typeof entry[1] != 'function' && entry[0] != 'key')), 
				manager: Object.fromEntries(Object.entries(this.manager as Technician).filter(entry => entry[1] && typeof entry[1] != 'function' && entry[0] != 'key'))}
		);
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