import React, { useState, useContext, useEffect } from 'react';
import {Image, View,Text,TouchableOpacity,ImageBackground,TextInput, StyleSheet,} from 'react-native';
import { theme } from '../../constants/theme';
import { routes } from '../../navigations/routes';
import { Box } from 'react-native-design-utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MultipleSelectBox from '../commons/MultipleSelect';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import FeatherIcon from 'react-native-vector-icons/Feather';
const EditProfileScreen = ({ navigation }) => {

    const [userData, setUserData] = useState(null);
    const updateUser = async () => {
        await firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .update({
                fname: userData.fname, lname: userData.lname, email: userData.email, country: userData.country, phone: userData.phone
                , topics: userData.topics, favourites: userData.favourites
            })
            .then(() => {
                console.log('User Updated!'); console.log(userData); alert('Profile Updated!', 'Your profile has been updated successfully.');
            })
            .catch(function (error) { console.log('There has been a problem with your fetch operation: ' + error.message); throw error; });
    };
    const getUser = async () => {

        await firestore().collection('users').doc(auth().currentUser.uid).get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) { setUserData(documentSnapshot.data()); console.log(documentSnapshot.data()); }
                console.log(documentSnapshot.data())
            })
    };
    const sendTopicsback = (selectedTopics) => {
        setUserData({ ...userData, topics: selectedTopics });
    };

    useEffect(() => {

        getUser();
    }, []);
    return (
        <View style={styles.container}>
            <View style={{alignItems:'center'}}>
                <Box   circle={100} bg={theme.color.white} mb="2xs" center><FeatherIcon name="user" size={40} color={theme.color.blueDarkest} /></Box>
            </View>
            

            {/* <Text style={styles.text}>Select multiple topics of interest</Text> */}

            <View style={styles.multiselectcontainer}>
                <MultipleSelectBox sendTopicsback={sendTopicsback}></MultipleSelectBox>
            </View>
            <View style={styles.inputs}>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={theme.color.purple} size={20} />
                    <TextInput
                        placeholder="First Name"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        value={userData ? userData.fname : ''}
                        onChangeText={(txt) => setUserData({ ...userData, fname: txt })}
                        style={[
                            styles.textInput,
                            {
                                color: theme.color.purple,
                            },
                        ]}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={theme.color.purple} size={20} />
                    <TextInput
                        placeholder="Last Name"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        value={userData ? userData.lname : ''}
                        onChangeText={(txt) => setUserData({ ...userData, lname: txt })}
                        style={[
                            styles.textInput,
                            {
                                color: theme.color.purple,
                            },
                        ]}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={theme.color.purple} size={20} />
                    <TextInput
                        placeholder="Age"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        value={userData ? userData.age : ''}
                        onChangeText={(txt) => setUserData({ ...userData, age: txt })}
                        style={[
                            styles.textInput,
                            {
                                color: theme.color.purple,
                            },
                        ]}
                    />
                </View>
                <View style={styles.action}>
                    <Feather name="phone" color={theme.color.purple} size={20} />
                    <TextInput
                        placeholder="Phone"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        value={userData ? userData.phone : ''}
                        onChangeText={(txt) => setUserData({ ...userData, phone: txt })}
                        autoCorrect={false}
                        style={[
                            styles.textInput,
                            {
                                color: theme.color.purple,
                            },
                        ]}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="envelope-o" color={theme.color.purple} size={20} />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#666666"
                        keyboardType="email-address"
                        value={userData ? userData.email : ''}
                        onChangeText={(txt) => setUserData({ ...userData, email: txt })}
                        autoCorrect={false}
                        style={[
                            styles.textInput,
                            {
                                color: theme.color.purple,
                            },
                        ]}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="globe" color={theme.color.purple} size={20} />
                    <TextInput
                        placeholder="Country"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        value={userData ? userData.country : ''}
                        onChangeText={(txt) => setUserData({ ...userData, country: txt })}
                        style={[
                            styles.textInput,
                            {
                                color: theme.color.purple,
                            },
                        ]}
                    />
                </View>

                <TouchableOpacity style={styles.commandButton} onPress={async () => { await updateUser(); await navigation.navigate(routes.HOME) }}>
                    <Text style={styles.panelButtonTitle}>Submit</Text>
                </TouchableOpacity>

            </View>


        </View>
    )
};
export default EditProfileScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
     
    },
    text: {
        fontSize: 20,
        height: 25,
        marginLeft: 15
    },
    inputs: {
        marginLeft: 15
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
        alignSelf: 'center'
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: theme.color.africanviolet,
        alignItems: 'center',
        marginTop: 10,
    },

    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    multiselectcontainer: {
        marginLeft: 15
    }
});