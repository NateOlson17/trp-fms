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
                _name: string,
                _includes: string[],
                _avgPurchaseCost: number,
                _rentalCost: number,
                _powerDraw: number,
                _qtyOwned: number,
                _qtyAvail: number,
                _serviceTickets: ServiceTicket[],
                _notes: string
        ) {
                this.name = _name;
                this.includes = _includes;
                this.avgPurchaseCost = _avgPurchaseCost;
                this.rentalCost = _rentalCost;
                this.powerDraw = _powerDraw;
                this.qtyOwned = _qtyOwned;
                this.qtyAvail = _qtyAvail;
                this.serviceTickets = _serviceTickets;
                this.notes = _notes;
        }

        break(qty: number, reason: string, notes: string) {
                //decrease quantityavail, store reason/notes/qty in Service Ticket member var object. Member var should be array of service tickets, append new one
        }

        fix(ticketNum: number) {
                //delete service ticket at index
        }
}