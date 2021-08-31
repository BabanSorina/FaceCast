import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';
import HomeScreen from '../components/screens/HomeScreen';
import FaceDetectorScreen from '../components/screens/FaceDetectorScreen';
import PodcastScreen from '../components/screens/PodcastScreen';
import FavouriteScreen from '../components/screens/FavouriteScreen';

import { theme } from '../constants/theme';
import { routes } from './routes';
import OnboardingScreen from '../components/screens/OnboardingScreen';
import ProfileScreen from '../components/screens/ProfileScreen';
import EditProfileScreen from '../components/screens/EditProfileScreen';
import RecommendPodcastScreen from '../components/screens/RecommendPodcast';
import SearchPodcastScreen from '../components/screens/SearchPodcastScreen';
import Header from '../components/commons/Header';
const HomeStack = createStackNavigator();
const HomeStackNavigation = () => {
    return (
        <HomeStack.Navigator screenOptions={{
            headerBackTitleVisible: false,
            headerBackTitleStyle: { color: theme.color.blueLight },
        }}  >

            <HomeStack.Screen name={routes.HOME} component={HomeScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name={routes.FACEDETECTOR} component={FaceDetectorScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name={routes.PODCAST} component={PodcastScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name={routes.FAVOURITE} component={FavouriteScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name={routes.SEARCH} component={SearchPodcastScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name={routes.PROFILE} component={ProfileStackNavigation} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
};

const FaceDetectorStack = createStackNavigator();
const FaceDetectorStackNavigation = () => {
    return (
        <FaceDetectorStack.Navigator screenOptions={{
            headerBackTitleVisible: false,
            headerBackTitleStyle: { color: theme.color.blueLight },
        }}  >

            <FaceDetectorStack.Screen name={routes.FACEDETECTOR} component={FaceDetectorScreen} options={{ headerShown: false }} />
            <FaceDetectorStack.Screen name={routes.HOME} component={HomeStackNavigation} options={{ headerShown: false }} />
            <FaceDetectorStack.Screen name={routes.RECOMMEND} component={RecommendPodcastScreen} options={{headerShown:false}} />

        </FaceDetectorStack.Navigator>
    );
};
const FavouriteStack = createStackNavigator();
const FavouriteStackNavigation = () => {
    return (
        <FavouriteStack.Navigator screenOptions={{
            headerBackTitleVisible: false,
            headerBackTitleStyle: { color: theme.color.blueLight },
        }}  >
            <FavouriteStack.Screen name={routes.FAVOURITE} component={FavouriteScreen} options={{ headerShown: false }} />
            <FavouriteStack.Screen name={routes.HOME} component={HomeStackNavigation} options={{ headerShown: false }} />


        </FavouriteStack.Navigator>
    );
};
const ProfileStack = createStackNavigator();
const ProfileStackNavigation = () => {
    return (
        <ProfileStack.Navigator screenOptions={{
            headerBackTitleVisible: false,
            headerBackTitleStyle: { color: theme.color.blueLight },
        }} >
            <ProfileStack.Screen name={routes.PROFILE} component={ProfileScreen} options={{ headerShown: false }} ></ProfileStack.Screen>
            <ProfileStack.Screen name={routes.EDITPROFILE} component={EditProfileScreen} options={{ headerShown: false }} />
            <ProfileStack.Screen name={routes.FACEDETECTOR} component={FaceDetectorStackNavigation} options={{ headerShown: false }} />
        </ProfileStack.Navigator>
    )
}
export { HomeStackNavigation, FaceDetectorStackNavigation, FavouriteStackNavigation, ProfileStackNavigation };