import { push, ref, remove } from 'firebase/database';
import rtdb from '@/app/rtdb_config';

import Gear from '@/app/utils/Gear';
import Technician from '@/app/utils/Technician';
import { COLORS } from '../globals';


export type Cost = {
	name: string,
	amount: number,
	notes: string
}

export class STATUS {
	static readonly RESERVED  = new STATUS(0, COLORS.RED, 'RESERVED');
	static readonly QUOTED  = new STATUS(1, COLORS.YELLOW, 'QUOTED');
	static readonly CONFIRMED  = new STATUS(2, COLORS.GREEN, 'CONFIRMED');
	static readonly OUTBOUNDED  = new STATUS(3, COLORS.LIGHT_GRAY, 'OUTBOUNDED');
	static readonly INBOUNDED  = new STATUS(4, COLORS.RED, 'INBOUNDED');
	static readonly INVOICED  = new STATUS(5, COLORS.YELLOW, 'INVOICED');
	static readonly PAID  = new STATUS(6, COLORS.GREEN, 'PAID');
  	
	private constructor(public readonly step: number, public readonly color: string, public readonly name: string) {}
}

export default class Event {
	name?: string;
	location?: string;
	client?: string;
	manager?: Technician;
	contact?: string;
	contactInfo?: string;

	startDate: number;
	endDate: number;

	quotePrice?: number;
	invoicePrice?: number;

	gear: Gear[];
	techs: {tech: Technician, rate: number | undefined, paid: boolean | undefined}[] | undefined;

	dateQuoted?: number;
	dateConfirmed?: number;
	dateInvoiced?: number;
	datePaid?: number;

	ROD: {item: string, time: number}[] | undefined;

	subrentals: Cost[];

	otherCosts: Cost[];
	
	outboundNotes: string;
	inboundNotes: string;
	notes: string;

	status: STATUS;
	flagged: boolean;

	key: string | undefined;

	constructor(args: {
		name?: string,
		location?: string,
		client?: string,
		manager?: Technician,
		contact?: string,
		contactInfo?: string,


		startDate: number,
		endDate: number,

		quotePrice?: number,
		invoicePrice?: number,

		gear?: Gear[],
		techs?: {tech: Technician, rate: number | undefined, paid: boolean | undefined}[],

		dateQuoted?: number,
		dateConfirmed?: number,
		dateInvoiced?: number,
		datePaid?: number,

		ROD?: {item: string, time: number}[],

		subrentals?: Cost[],

		otherCosts?: Cost[],
						
		outboundNotes?: string,
		inboundNotes?: string,
		notes?: string,

		status?: STATUS,
		flagged?: boolean

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

		this.gear = args.gear ? args.gear.map(gearItem => new Gear(gearItem)) : [];
		this.techs = args.techs ? args.techs.map(t => ({...t, tech: new Technician(t.tech)})) : undefined;


		this.dateQuoted = args.dateQuoted;
		this.dateConfirmed = args.dateConfirmed;
		this.dateInvoiced = args.dateInvoiced;
		this.datePaid = args.datePaid; 

		this.ROD = args.ROD;

		this.subrentals = args.subrentals || [];

		this.otherCosts = args.otherCosts || [];
		
		this.outboundNotes= args.outboundNotes || '';
		this.inboundNotes = args.inboundNotes || '';
		this.notes = args.notes || '';

		this.status = args.status || STATUS.RESERVED;
		this.flagged = args.flagged || false;

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