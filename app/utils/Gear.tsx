import { push, ref, remove, set } from 'firebase/database';
import rtdb from '@/app/rtdb_config';

import ServiceTicket from '@/app/utils/ServiceTicket';
import { getCurrentDate } from '@/app/globals';

export type GearContainer = {
        infrastructure: Gear[];
        laserFixtures: Gear[];
        lxFixtures: Gear[];
        sfx: Gear[];
        showControl: Gear[];
        cable: Gear[];
}

export default class Gear {
        [key: string]: 
                string | 
                number | 
                string[] | 
                ServiceTicket[] | 
                {qty: number, date: string}[] | 
                {qty: number, location: string}[] | 
                ((ticket: ServiceTicket) => void) | 
                ((qty: number, cost: number, location: string) => void) | 
                ((container: keyof GearContainer, gear: GearContainer) => void) | 
                ((qty: number, location: string) =>void)
        name: string;
        includes: string[];
        avgPurchaseCost: number;
        rentalCost: number;
        powerDraw: number;
        qtyOwned: number;
        serviceTickets: ServiceTicket[];
        notes: string;
        purchaseDates: {qty: number, date: string}[];
        locations: {qty: number, location: string}[];
        key: string;

        constructor(args: {
                name: string,
                includes: string[] | undefined,
                avgPurchaseCost: number,
                rentalCost: number,
                powerDraw: number,
                qtyOwned: number,
                serviceTickets: ServiceTicket[] | undefined,
                notes: string | undefined,
                purchaseDates: {qty: number, date: string}[],
                locations: {qty: number, location: string}[],
                key: string | undefined
        }) {
                this.name = args.name;
                this.includes = args.includes || [];
                this.avgPurchaseCost = args.avgPurchaseCost;
                this.rentalCost = args.rentalCost;
                this.powerDraw = args.powerDraw;
                this.qtyOwned = args.qtyOwned;
                this.serviceTickets = args.serviceTickets ? args.serviceTickets.map(ticket => new ServiceTicket(ticket)) : [];
                this.notes = args.notes || '';
                this.purchaseDates = args.purchaseDates || [];
                this.locations = args.locations || [];
                this.key = args.key || '';
        }

        deleteTicket = (ticket: ServiceTicket) => {
                set(ref(rtdb, `GearContainer/${this.key}/serviceTickets`), this.serviceTickets.splice(this.serviceTickets.indexOf(ticket), 1));
        }

        addTicket = (ticket: ServiceTicket) => {
                set(ref(rtdb, `GearContainer/${this.key}/serviceTickets`), [...this.serviceTickets, ticket]);
        }

        addToContainer = (container: keyof GearContainer) => {
                push(ref(rtdb, `GearContainer/${container}`), 
                        Object.fromEntries(Object.entries(this).filter(entry => typeof entry[1] != 'function' && entry[0] != 'key'))
                );
        }

        addQty = (qty: number, cost: number, location: string) => {
                this.avgPurchaseCost = (this.qtyOwned * this.avgPurchaseCost + cost) / (this.qtyOwned + qty);
                this.qtyOwned += qty;
                this.purchaseDates.push({qty: qty, date: getCurrentDate()});
                if (!this.locations.map(loc => loc.location).includes(location)) {
                        this.locations.push({qty: qty, location: location});
                } else {
                        this.locations.forEach(loc => {if (loc.location === location) {loc.qty += qty;}});
                }

                set(ref(rtdb, `GearContainer/${this.key}`), 
                        Object.fromEntries(Object.entries(this).filter(entry => typeof entry[1] != 'function' && entry[0] != 'key'))
                );
        }

        deleteQty = (qty: number, location: string) => {
                if (qty === this.qtyOwned) {
                        remove(ref(rtdb, `GearContainer/${this.key}`));
                } else {
                        this.qtyOwned -= qty;
                        this.locations.forEach(loc => {if (loc.location === location) {loc.qty -= qty;}});

                        set(ref(rtdb, `GearContainer/${this.key}`), 
                                Object.fromEntries(Object.entries(this).filter(entry => typeof entry[1] != 'function' && entry[0] != 'key'))
                        );

                }
        }
}