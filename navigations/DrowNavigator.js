import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../Screens/Home';
import Favorites from '../Screens/Favorites';
import Routes from '../Utils/MyRoutes';

const Drawer = createDrawerNavigator();

function DrowNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name={Routes.home} component={Home} />
            <Drawer.Screen name={Routes.favorites} component={Favorites} />
        </Drawer.Navigator>
    );
}

export default DrowNavigator;