import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import DrawerNavigation from './DrawerNavigation';

import { AuthContext } from './AuthProvider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Route = () => {
    const { user, setUser, setUserProfile } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);
    const onAuthStateChanged = (user) => {
        setUser(user);
        if(user) getUserProfile(user.uid);
        if (initializing) setInitializing(false);
    };
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const getUserProfile = async (usersUid) => {
        await firestore()
            .collection('users')
            .doc(usersUid)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    setUserProfile(documentSnapshot.data());
                }
            })
    };

   

    if (initializing) return null;
    return (
        <NavigationContainer>
            {user ? <DrawerNavigation /> : <AuthStack />}
        </NavigationContainer>
    )

};
export default Route;