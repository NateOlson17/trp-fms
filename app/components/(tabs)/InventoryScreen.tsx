import { useContext } from 'react';
import { View } from 'react-native';
import { GearContext } from './_layout'
import { COLORS } from '@/app/globals';
import GearExpandable from '../GearExpandable';

const InventoryScreen = () => {
    const gear = useContext(GearContext)

    return(
        <View style={{paddingTop: 50, paddingBottom: 100, flex: 1, backgroundColor: COLORS.BLACK}}>
            <GearExpandable name='INFRASTRUCTURE' data={gear.infrastructure}/>
            <GearExpandable name='LASER FIXTURES' data={gear.laserFixtures}/>
            <GearExpandable name='LX FIXTURES' data={gear.lxFixtures}/>
            <GearExpandable name='SFX' data={gear.sfx}/>
            <GearExpandable name='SHOW CONTROL' data={gear.showControl}/>
        </View>
    );
}

export default InventoryScreen;