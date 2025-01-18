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
        qtyAvail: number;
        serviceTickets: ServiceTicket[];
        notes: string;

        constructor(
                name: string,
                includes: string[],
                avgPurchaseCost: number,
                rentalCost: number,
                powerDraw: number,
                qtyOwned: number,
                qtyAvail: number,
                serviceTickets: ServiceTicket[],
                notes: string
        ) {
                this.name = name;
                this.includes = includes;
                this.avgPurchaseCost = avgPurchaseCost;
                this.rentalCost = rentalCost;
                this.powerDraw = powerDraw;
                this.qtyOwned = qtyOwned;
                this.qtyAvail = qtyAvail;
                this.serviceTickets = serviceTickets;
                this.notes = notes;
        }

        break(qty: number, reason: string, notes: string) {
                //decrease quantityavail, store reason/notes/qty in Service Ticket member var object. Member var should be array of service tickets, append new one
        }

        fix(ticketNum: number) {
                //delete service ticket at index
        }
}