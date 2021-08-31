
import React from 'react';


import DrawerContent from '../components/commons/DrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { theme } from '../constants/theme';
import { routes } from './routes';
import { useWindowDimensions } from 'react-native';
import LogInScreen from '../components/screens/LogInScreen';
import RegisterScreen from '../components/screens/RegisterScreen';
import ProfileScreen from '../components/screens/ProfileScreen';
import EditProfileScreen from '../components/screens/EditProfileScreen';
import {HomeTabNavigation, FavouriteTabNavigation,FaceDetectorTabNavigation} from './TabNavigation';
import { ProfileStackNavigation } from './StackNavigation';
import SettingsScreen from '../components/screens/SettingScreen';
import SupportScreen from '../components/screens/SupportScreen';


const Drawer = createDrawerNavigator();


const DrawerNavigation = ({ navigation }) => {
    const dimensions = useWindowDimensions();

    return (
        <Drawer.Navigator 
            drawerStyle={{ backgroundColor: '#c6cbef', width: 200, }}
            drawerType='slide'
        swipeEnabled='true'
            drawerContent={(props) => <DrawerContent {...props} />}
            overlayColor="transparent"
        >
            <Drawer.Screen name={routes.HOME} component={HomeTabNavigation}  options={{headerLeft: true}}/>
            <Drawer.Screen name={routes.FAVOURITE} component={FavouriteTabNavigation}  options={{headerLeft: true}}/>
            <Drawer.Screen name={routes.FACEDETECTOR} component={FaceDetectorTabNavigation}  options={{headerLeft: true}}/>
            <Drawer.Screen name={routes.LOGIN} component={LogInScreen}  options={{headerLeft: true}}/>
            <Drawer.Screen name={routes.REGISTER} component={RegisterScreen}  options={{headerLeft: true}}/>
            
            <Drawer.Screen name={routes.PROFILE} component={ProfileStackNavigation}  options={{headerLeft: true}}/>
            <Drawer.Screen name={routes.SETTINGS} component={SettingsScreen}  options={{headerLeft: true}}/>
            <Drawer.Screen name={routes.SUPPORT} component={SupportScreen}  options={{headerLeft: true}}/>
          
        </Drawer.Navigator>

    )
};
export default DrawerNavigation;