import React, { useContext, useState } from 'react';
import { Box } from 'react-native-design-utility';
import { StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity, Text } from 'react-native';
import { AuthContext } from '../../navigations/AuthProvider';
import { theme } from '../../constants/theme';
import firestore from '@react-native-firebase/firestore';
import { routes } from '../../navigations/routes';

import Header from '../commons/Header';
import { View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FeatherIcon from 'react-native-vector-icons/Feather';
const ProfileScreen = ({ navigation }) => {
const {user,logout}= useContext(AuthContext);
    const getUser = async () => {
        await firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log('User Data', documentSnapshot.data());
                    setUserData(documentSnapshot.data());
                }
            })
    };
    const getTopics = () => {

        return userData.topics.map((item) => {


            return (
                <View  key={item.id}style={styles.action}>
                    <FontAwesome name="heart" color={theme.color.purple} size={20} />
                    <Text style={styles.textInput} >{item.item} </Text>
                </View>
            )
        } )
    };
    const noUser = () => {
        return (<View>
            <Text>no user</Text>
        </View>)
    };
    React.useEffect(() => {

        getUser();
    }, [userData]);

   
    const [userData, setUserData] = useState(null);

    return (
       
           

            <ScrollView style={styles.container}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                  
                <Box circle={100} bg={theme.color.white} mb="2xs" center><FeatherIcon name="user" size={40} color={theme.color.blueDarkest} /></Box>
                <Text style={styles.userName}>{userData ? userData.fname + " " + userData.lname : ""} </Text>
                <Text style={styles.aboutUser}> {userData ? userData.uid : ""}</Text>
                <Box style={styles.userBtnWrapper}>
                    <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate(routes.EDITPROFILE)}>
                        <Text style={styles.userBtnTxt}>Edit profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.userBtn} onPress={() => logout(user.email, user.password)}>
                        <Text style={styles.userBtnTxt}>logout</Text>
                    </TouchableOpacity>
                </Box>
                <View style={styles.detailsUser}>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color={theme.color.purple} size={20} />
                        <Text style={styles.textInput} >{userData ? userData.fname : ""}</Text>

                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color={theme.color.purple} size={20} />
                        <Text style={styles.textInput} >{userData ? userData.lname : ""}</Text>
                    </View>
                    <View style={styles.action}>
                        <Feather name="phone" color={theme.color.purple} size={20} />
                        <Text style={styles.textInput} >{userData ? userData.phone : ""}</Text>
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="envelope-o" color={theme.color.purple} size={20} />
                        <Text style={styles.textInput} >{userData ? userData.email : ""}</Text>
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="globe" color={theme.color.purple} size={20} />
                        <Text style={styles.textInput} >{userData ? userData.country : ""}</Text>
                    </View>
                    <Text style={styles.topicsText}>Topics of interest:</Text>
                    {userData ? getTopics() : noUser()}




                </View >



            </ScrollView>
     
    )
};
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        padding: 20,
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: theme.color.purpleDarker,

    },
    aboutUser: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.color.africanviolet,
        textAlign: 'center',
        marginBottom: 10,
    },
    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    userBtn: {
        borderColor: theme.color.africanviolet,
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    },
    userBtnTxt: {
        color: theme.color.africanviolet,
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
    },
    userInfoItem: {
        justifyContent: 'center',
    },
    userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    userInfoSubTitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        paddingLeft: 30,
        paddingRight: 30
    },
    topicsText: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        paddingLeft: 30,
        paddingRight: 30,
        color: theme.color.africanviolet,
        fontSize: 20
    },

    textInput: {
        flex: 1,
        marginTop: 0,
        paddingLeft: 10,
        color: theme.color.africanviolet,
    }, detailsUser: {
        alignItems: 'flex-start'
    },
});