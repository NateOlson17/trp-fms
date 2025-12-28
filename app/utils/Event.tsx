import { push, ref, set } from 'firebase/database';

import Gear from '@/app/utils/Gear';
import Technician from '@/app/utils/Technician';

import { COLORS } from '@/app/globals';

import requestDBUpdate from '@/app/DBUpdateHandler';
import rtdb from '@/app/DBConfig';


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

export type GearList = {qty: number, gear: Gear}[];
export type GearListContainer = {lxFixtures: GearList, laserFixtures: GearList, infrastructure: GearList, sfx: GearList, showControl:GearList, cable: GearList};

export default class Event {
	name: string;
	location: string;
	client: string;
	manager?: Technician;
	contact: string;
	contactInfo: string;

	startDate: number;
	endDate: number;

	quotePrice?: number;
	invoicePrice?: number;

	gear: GearListContainer;
	techs: {tech: Technician, rate: number | undefined, paid: boolean | undefined}[] | undefined;

	dateQuoted: number;
	dateConfirmed: number;
	dateInvoiced: number;
	datePaid: number;

	ROD: {item: string, time: number}[] | undefined;

	subrentals: Cost[];

	otherCosts: Cost[];
	
	outboundNotes: string;
	inboundNotes: string;
	notes: string;

	status: STATUS;
	flagged: boolean;

	shop: string;

	key: string | undefined;

	constructor(args: {
		name?: string,
		location?: string,
		client?: string,
		manager?: Technician,
		contact?: string,
		contactInfo?: string,


		startDate?: number,
		endDate?: number,

		quotePrice?: number,
		invoicePrice?: number,

		gear?: GearListContainer,
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
		flagged?: boolean,

		shop?: string,

		key?: string
	}) {
		this.name = args.name || '';
		this.location = args.location || '';
		this.client = args.client || '';
		this.manager = args.manager ? new Technician(args.manager) : undefined;
		this.contact = args.contact || '';
		this.contactInfo = args.contactInfo || '';

		this.startDate = args.startDate || 0;
		this.endDate = args.endDate || 0;

		this.quotePrice = args.quotePrice;
		this.invoicePrice = args.invoicePrice;

		this.gear = args.gear ? args.gear : {lxFixtures: [], laserFixtures: [], cable: [], infrastructure: [], sfx: [], showControl: []};
		this.techs = args.techs ? args.techs.map(t => ({...t, tech: new Technician(t.tech)})) : undefined;


		this.dateQuoted = args.dateQuoted || 0;
		this.dateConfirmed = args.dateConfirmed || 0;
		this.dateInvoiced = args.dateInvoiced || 0;
		this.datePaid = args.datePaid || 0; 

		this.ROD = args.ROD;

		this.subrentals = args.subrentals || [];

		this.otherCosts = args.otherCosts || [];
		
		this.outboundNotes= args.outboundNotes || '';
		this.inboundNotes = args.inboundNotes || '';
		this.notes = args.notes || '';

		this.status = args.status || STATUS.RESERVED;
		this.flagged = args.flagged || false;

		this.shop = args.shop || 'CO';

		this.key = args.key;
	}

	pushToDB = () => {
		push(ref(rtdb, 'EventContainer/'), 
			{...Object.fromEntries(Object.entries(this).filter(entry => entry[1] && typeof entry[1] != 'function' && entry[0] != 'key')), 
				manager: Object.fromEntries(Object.entries(this.manager as Technician).filter(entry => entry[1] && typeof entry[1] != 'function' && entry[0] != 'key'))}
		);
		requestDBUpdate();
	}

	setGear = (newGear: GearListContainer) => {
		set(ref(rtdb, `EventContainer/${this.key}/gear`), newGear);
		requestDBUpdate()
	}

}