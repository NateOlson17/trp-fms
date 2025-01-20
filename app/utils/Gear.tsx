import { ref, set } from 'firebase/database';
import rtdb from '@/app/rtdb_config';

import ServiceTicket from './ServiceTicket';

export interface GearContainer {
        infrastructure: Gear[];
        laserFixtures: Gear[];
        lxFixtures: Gear[];
        sfx: Gear[];
        showControl: Gear[];
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

        constructor(
                name: string,
                includes: string[],
                avgPurchaseCost: number,
                rentalCost: number,
                powerDraw: number,
                qtyOwned: number,
                serviceTickets: ServiceTicket[],
                notes: string,
                key: string
        ) {
                this.name = name;
                this.includes = includes;
                this.avgPurchaseCost = avgPurchaseCost;
                this.rentalCost = rentalCost;
                this.powerDraw = powerDraw;
                this.qtyOwned = qtyOwned;
                this.serviceTickets = serviceTickets;
                this.notes = notes;
                this.key = key;
        }

        deleteServiceTicket = (ticket: ServiceTicket) => {
                const ticketIndex = this.serviceTickets.indexOf(ticket);
                this.serviceTickets.splice(ticketIndex, 1);
                set(ref(rtdb, 'GearContainer/' + this.key + '/serviceTickets'), this.serviceTickets);
        }
}