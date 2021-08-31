import React, { useState } from 'react';
import { Box, Text } from 'react-native-design-utility';

import FormButton from '../commons/FormButton';
import FormInput from '../commons/FormInput';
import SocialButton from '../commons/SocialButton';
import { routes } from '../../navigations/routes';
import { theme } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../../navigations/AuthProvider';
import MultipleSelectBox from '../commons/MultipleSelect';
import { RouteProp, useRoute } from '@react-navigation/core';
import {Image, View,TouchableOpacity,ImageBackground,TextInput, StyleSheet,} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const RegisterScreen2 = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const sendTopicsback = (selectedTopics) => {
        setUserData({ ...userData, topics: selectedTopics });
      

    };
    const { params } = useRoute();
    const { register } = useContext(AuthContext);
    return (
        <Box style={styles.container}>
           <Text style={styles.text1}>Please complete the required information for your account:</Text>
            <MultipleSelectBox sendTopicsback={sendTopicsback}></MultipleSelectBox>
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
            
            <FormButton
                buttonTitle="Sign Up"
                onPress={() => { register(params.email,params.password, userData.topics, userData.country); }}
            />

            <Box style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By registering, you confirm that you accept our{' '}
                </Text>
                <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
                    <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                        Terms of service
                    </Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> and </Text>
                <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                    Privacy Policy </Text>
            </Box>
            


        </Box>
    );
};

export default RegisterScreen2;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.color.white,
        flex: 1,
         justifyContent: 'center',
        // alignItems: 'center',
        padding: 20,
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
 
    },
    text1: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
        padding:10
    },
    navButton: {
        marginTop: 15,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Lato-Regular',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Lato-Regular',
        color: 'grey',
    },
    action: {
        flexDirection: 'row',
        marginTop: 30,
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
});
