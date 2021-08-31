import React from 'react';

import { Box, Text } from 'react-native-design-utility';
import { theme } from '../../constants/theme';
import { View, StyleSheet, ScrollView, Image, Linking, Button, TouchableHighlight } from 'react-native';
import { windowHeight, windowWidth } from '../../constants/Dimensions';
import FeatherIcon from 'react-native-vector-icons/Feather';

const SupportScreen = () => {
    return (
        <View style={{flex:1}}>
                       <Image style={styles.userImg} source={require('../../assets/header4.jpg')}></Image>

            <View style={styles.container}>
                <View>
                    <TouchableHighlight underlayColor={theme.color.africanviolet}
                        onPress={() => Linking.openURL('mailto:supportFaceCast@gmail.com.com?subject=Helpus&body=Description(delete and write your problem here')} style={styles.button}>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }} >
                            <FeatherIcon name="mail" size={40} color={theme.color.greyLighter} />
                            <Text style={styles.button_text}>Send us an email</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View>
                    <TouchableHighlight underlayColor={theme.color.africanviolet}
                        onPress={() => Linking.openURL('tel:0753241878')} style={styles.button}>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }} >
                            <FeatherIcon name="phone" size={40} color={theme.color.greyLighter} />
                            <Text style={styles.button_text}>Give us a call</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )

};

export default SupportScreen;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        alignContent:'center',
        flex:1,
        justifyContent:'center'
    },
    userImg: {
        width: '100%',
        height: windowHeight / 15,

       
    },
    button: {

        backgroundColor: theme.color.africanviolet,
        borderRadius: 10,
        width: windowWidth - 50,
        padding: 20,
         margin:10,
        alignSelf: 'center', 
        alignItems:'center'
    },
    button_text: {
        color: theme.color.greyLighter,
        fontSize: 25,
        alignSelf: 'center', 
        alignItems:'center',
        marginLeft:10,
        
    }

});