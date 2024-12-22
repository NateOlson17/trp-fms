import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import { COLORS } from './globals'

const Index = () => {
    return (
        <SafeAreaView style={{alignItems: 'center', backgroundColor: COLORS.BLACK, flex: 1}}>
          <Image style={{width: 200, height: 200}}
        source={require('../assets/images/logo-white-circle.png')}/>
          <Link href="/components/CalendarScreen" style={{color: COLORS.WHITE}}>
            LOG IN
          </Link>
        </SafeAreaView>     
      
    );
}

export default Index;