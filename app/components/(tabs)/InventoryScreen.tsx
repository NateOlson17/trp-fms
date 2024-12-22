import { useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import { GearContext } from './_layout'

import Gear from '@/app/utils/Gear';

const InventoryScreen = () => {
    const gear = useContext(GearContext)

    const renderGearItem = ({ item }: {item: Gear}) => {
        return (
          <View>
            <Text style={{marginTop: 15}}>{item.name}</Text>
            <Text>{item.qtyOwned} </Text>
          </View>
      );
    }

    return(
        <View style={{marginTop: 50}}>
            <FlatList
                data={gear.infrastructure}
                renderItem={renderGearItem}
                keyExtractor={(gearItem) => (gearItem.name)}
            />
            <FlatList
                data={gear.laserFixtures}
                renderItem={renderGearItem}
                keyExtractor={(gearItem) => (gearItem.name)}
            />
            <FlatList
                data={gear.lxFixtures}
                renderItem={renderGearItem}
                keyExtractor={(gearItem) => (gearItem.name)}
            />
            <FlatList
                data={gear.sfx}
                renderItem={renderGearItem}
                keyExtractor={(gearItem) => (gearItem.name)}
            />
            <FlatList
                data={gear.showControl}
                renderItem={renderGearItem}
                keyExtractor={(gearItem) => (gearItem.name)}
            />
        </View>
    );
}

export default InventoryScreen;