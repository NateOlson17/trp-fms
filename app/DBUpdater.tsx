import { onValue, ref } from 'firebase/database';

import Gear, { GearContainer } from '@/app/utils/Gear';
import Technician from '@/app/utils/Technician';
import Event from '@/app/utils/Event';

import { checkObjEqual, MASTER_DB } from '@/app/globals';

import rtdb from '@/app/DBConfig';
import { registerDBUpdateHandler } from '@/app/DBUpdateHandler';


const getGear = async() => {
  const gearRef = ref(rtdb, 'GearContainer'); //create reference to firebase rtdb at master gear container
  let newGear: GearContainer = {infrastructure: [], laserFixtures: [], lxFixtures: [], sfx: [], showControl: [], cable: []};

  onValue(gearRef, snapshot => {
    if (snapshot.exists()) {
      snapshot.forEach(container => { //for each category object in master container (infrastructure, lxFixtures, etc)
        container.forEach(gearItem => { //for each Gear item in category
          newGear[container.key as keyof GearContainer].push(new Gear({...gearItem.val(), key: `${container.key}/${gearItem.key}`})); //get key of current category and push to corresponding Gear array a new Gear object with data from current item
          //structure of gear state is now a GearContainer object consisting of arrays for each category. Each array contains Gear objects
        });
      });
    } else {console.log('GEAR OFFLINE');}
  });
  return newGear;
}

const getEvents = async() => {
  const eventRef = ref(rtdb, 'EventContainer'); //create reference to firebase rtdb at event container
  let newEvents: Event[] = [];

  onValue(eventRef, snapshot => {
    if (snapshot.exists()) {
      snapshot.forEach(event => {
        newEvents.push(new Event({...event.val(), key: event.key})); //create new event for each item in DB container
      });
    } else {console.log('EVENTS OFFLINE');}
  });

  return newEvents;
}

const getTechs = async() => {
  const techRef = ref(rtdb, 'TechnicianContainer'); //create reference to firebase rtdb at tech container
  let newTechs: Technician[] = [];

  onValue(techRef, snapshot => {
    if (snapshot.exists()) {
      snapshot.forEach(tech => {
        newTechs.push(new Technician({...tech.val(), key: tech.key})); //create new Technician with DB data
      });
    } else {console.log('TECHS OFFLINE');}
  });

  return newTechs;
}


let boundUpdater: ((force?: boolean) => Promise<void>);

export const bindDBUpdater = () => {
  boundUpdater = async(force = false) => {
    const [newGear, newEvents, newTechs] = await Promise.all([getGear(), getEvents(), getTechs()]);

    if (!checkObjEqual(MASTER_DB.gear, newGear) || force) MASTER_DB.setGear(newGear);
    if (!checkObjEqual(MASTER_DB.events, newEvents) || force) MASTER_DB.setEvents(newEvents);
    if (!checkObjEqual(MASTER_DB.techs, newTechs) || force) MASTER_DB.setTechs(newTechs);
  };
};

const updateDB = async(force = false) => await boundUpdater(force);

registerDBUpdateHandler(() => updateDB());

export default updateDB;