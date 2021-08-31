import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { routes } from './routes';
import { theme } from '../constants/theme';

import TabBar from '../components/commons/TabBar';

import {HomeStackNavigation, FaceDetectorStackNavigation, FavouriteStackNavigation, ProfileStackNavigation} from './StackNavigation';

const Tab = createBottomTabNavigator();

const HomeTabNavigation = () => {
    return (
        <>
        <Tab.Navigator
        tabBar={props => <TabBar {...props} />}
            tabBarOptions={{
                showLabel: true,
                activeBackgroundColor:theme.color.purpleDarker
            }} 
            >
            <Tab.Screen  name={routes.HOME} component={HomeStackNavigation} />
            <Tab.Screen  name={routes.FACEDETECTOR} component={FaceDetectorStackNavigation} />
            <Tab.Screen  name={routes.FAVOURITE} component={FavouriteStackNavigation} />
            
            
        </Tab.Navigator>
        </>
    )
};
const FavouriteTabNavigation = () => {
    return (
        <>
        <Tab.Navigator
        tabBar={props => <TabBar {...props} />}
            tabBarOptions={{
                showLabel: true,
                activeBackgroundColor:theme.color.purpleDarker
            }} 
            >
           <Tab.Screen  name={routes.HOME} component={HomeStackNavigation} />
            <Tab.Screen  name={routes.FACEDETECTOR} component={FaceDetectorStackNavigation} />
            <Tab.Screen  name={routes.FAVOURITE} component={FavouriteStackNavigation} />
        </Tab.Navigator>
        </>
    )
};
const FaceDetectorTabNavigation = () => {
    return (
        <>
        <Tab.Navigator
        tabBar={props => <TabBar {...props} />}
            tabBarOptions={{
                showLabel: true,
                activeBackgroundColor:theme.color.purpleDarker
            }} 
            >
            <Tab.Screen  name={routes.HOME} component={HomeStackNavigation} />
            <Tab.Screen  name={routes.FACEDETECTOR} component={FaceDetectorStackNavigation} />
            <Tab.Screen  name={routes.FAVOURITE} component={FavouriteStackNavigation} />
            
            
        </Tab.Navigator>
        </>
    )
};
export {HomeTabNavigation,FavouriteTabNavigation,FaceDetectorTabNavigation};