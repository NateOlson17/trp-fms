import { push, ref, remove } from 'firebase/database';
import rtdb from '@/app/rtdb_config';

export default class Technician {
	name: string;
	contact: string;
	roles: {lx: number, ax: number, lsr: number, vdo: number};
	location: string;
	notes: string;
	key: string;

	constructor(args: {
		name: string, 
		contact: string, 
		roles: {lx: number, ax: number, lsr: number, vdo: number},
		location: string,
		notes: string,
		key: string
	}) {
		this.name = args.name;
		this.contact = args.contact;
		this.roles = args.roles;
		this.location = args.location;
		this.notes = args.notes;
		this.key = args.key;
	}

	pushToDB = () => {
		push(ref(rtdb, 'TechnicianContainer/'), 
			Object.fromEntries(Object.entries(this).filter(entry => typeof entry[1] != 'function' && entry[0] != 'key'))
		);
	}

	delete = () => {
		remove(ref(rtdb, `TechnicianContainer/${this.key}`));
	}
}