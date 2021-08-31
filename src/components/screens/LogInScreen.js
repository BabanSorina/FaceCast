import React, { useState, useContext } from 'react';
import { Box, Text } from 'react-native-design-utility';
import { StyleSheet, Image, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import { windowHeight, windowWidth } from '../../constants/Dimensions';
import FormButton from '../commons/FormButton';
import FormInput from '../commons/FormInput';
import SocialButton from '../commons/SocialButton';
import { useNavigation } from '@react-navigation/native';
import {routes}from '../../navigations/routes';
import {theme} from '../../constants/theme';
import { AuthContext } from '../../navigations/AuthProvider';
const LogInScreen = () => {


    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { navigate } = useNavigation();
    const {login} = useContext(AuthContext);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logobalint2.png')} ></Image>
            <Text style={styles.textWelcome}>Welcome to FaceCast! </Text>
            <Text style={styles.text}>Come enjoy your podcasts </Text>
            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <FormButton
                buttonTitle="Sign In"
                onPress={() => 
                  login(email,password)}
            />
            <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
                <Text style={styles.navButtonText}>Forgot Password?</Text>
            </TouchableOpacity>
            <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => alert('fb')}
          />
          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => alert('google')}
          />
          <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigate(routes.REGISTER)}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
        </ScrollView>
    )
};
export default LogInScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
        backgroundColor:theme.color.white
    },
    logo: {
        height: 150,
        width: 200,
        resizeMode: 'cover',

    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 23,
        color: '#051d5f',
        marginBottom: 25,
        paddingTop: 20
    },
    textWelcome: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        color: '#051d5f',
        marginBottom: 25,
        paddingTop: 20
    },navButton: {
        marginTop: 15,
      },
      forgotButton: {
        marginVertical: 35,
      },
      navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Lato-Regular',
      },

});