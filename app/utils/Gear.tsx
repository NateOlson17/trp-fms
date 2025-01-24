import { ref, set } from 'firebase/database';
import rtdb from '@/app/rtdb_config';

import ServiceTicket from './ServiceTicket';

export type GearContainer = {
        infrastructure: Gear[];
        laserFixtures: Gear[];
        lxFixtures: Gear[];
        sfx: Gear[];
        showControl: Gear[];
        cable: Gear[];
}

export default class Gear {
        name: string;
        includes: string[];
        avgPurchaseCost: number;
        rentalCost: number;
        powerDraw: number;
        qtyOwned: number;
        serviceTickets: ServiceTicket[];
        notes: string;
        key: string;

        constructor(args: {
                name: string,
                includes: string[],
                avgPurchaseCost: number,
                rentalCost: number,
                powerDraw: number,
                qtyOwned: number,
                serviceTickets: ServiceTicket[] | undefined,
                notes: string,
                key: string
        }) {
                this.name = args.name;
                this.includes = args.includes;
                this.avgPurchaseCost = args.avgPurchaseCost;
                this.rentalCost = args.rentalCost;
                this.powerDraw = args.powerDraw;
                this.qtyOwned = args.qtyOwned;
                this.serviceTickets = args.serviceTickets ? args.serviceTickets.map(ticket => new ServiceTicket(ticket)) : [];
                this.notes = args.notes;
                this.key = args.key;
        }

        deleteTicket = (ticket: ServiceTicket) => {
                const ticketIndex = this.serviceTickets.indexOf(ticket);
                this.serviceTickets.splice(ticketIndex, 1);
                set(ref(rtdb, `GearContainer/${this.key}/serviceTickets`), this.serviceTickets);
        }

        addTicket = (ticket: ServiceTicket) => {
                this.serviceTickets.push(ticket);
                set(ref(rtdb, `GearContainer/${this.key}/serviceTickets`), this.serviceTickets);
        }
}