import React, { useState } from 'react';
import { Box, Text } from 'react-native-design-utility';
import { StyleSheet, TouchableOpacity, ScrollView , Image} from 'react-native';
import FormButton from '../commons/FormButton';
import FormInput from '../commons/FormInput';
import SocialButton from '../commons/SocialButton';
import { routes } from '../../navigations/routes';
import { theme } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../../navigations/AuthProvider';

const RegisterScreen = ({ navigation }) => {
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const { navigate } = useNavigation();
    const { register } = useContext(AuthContext);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logobalint2.png')} ></Image>
            <Text style={styles.text}>Create an account</Text>

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

            <FormInput
                labelValue={confirmPassword}
                onChangeText={(userPassword) => setConfirmPassword(userPassword)}
                placeholderText="Confirm Password"
                iconType="lock"
                secureTextEntry={true}
            />
            
            <FormButton
                buttonTitle="Next"
                onPress={() => 
                    navigate(routes.REGISTER2, {email,password})}
            />
            {/* <FormButton
                buttonTitle="Sign Up"
                onPress={() => { register(email,password); navigation.navigate(routes.EDITPROFILE)}}
            /> */}

           
            < SocialButton
                buttonTitle="Sign Up with Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                onPress={() => { }}
            />

            <SocialButton
                buttonTitle="Sign Up with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={() => { }}
            />


            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigate(routes.LOGIN)}>
                <Text style={styles.navButtonText}>Have an account? Sign In</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.color.white,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        height: 150,
        width: 200,
        resizeMode: 'cover',

    },
    text: {
        paddingTop:10,
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
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
});
