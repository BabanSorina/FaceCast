import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';


import Onboarding from 'react-native-onboarding-swiper';
import { routes } from '../../navigations/routes';
import { theme } from '../../constants/theme';

const OnboardingScreen = () => {
    const { navigate } = useNavigation();
        return ( < Onboarding 
            onSkip={() => navigate(routes.LOGIN)}
            onDone={() => navigate(routes.LOGIN)} // aici nu ma lasa sa intru in home cu drawer si cu tot, numa direct in homescreen

            pages = {
                [{
                        backgroundColor:theme.color.lavendeblush,
                        image: < Image source = { require('../../assets/launch2.jpg') }
                        />,
                        title: 'on1',
                        subtitle: 'aici o sa fie un mini tutorial de folosit aplicatia', 
                        
                        

                    },
                    {
                        backgroundColor: theme.color.lavendeblush,
                        image: < Image source = { require('../../assets/Facecast-logo.png') }
                        />,
                        title: 'on2',
                        subtitle: 'plm'

                    }
                ]
                
            }
            />)


        };
        export default OnboardingScreen;