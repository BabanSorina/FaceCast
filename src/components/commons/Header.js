import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { Image , StyleSheet} from 'react-native';
import { theme } from '../../constants/theme';
import {windowHeight, windowWidth} from '../../constants/Dimensions';

console.log(windowHeight/15);
console.log(windowWidth);
const Header = (props) => {
    
    return (
        <Box pt={10}  >

                 <Image style={styles.userImg} source={require('../../assets/header4.jpg')}></Image>
            
        </Box>
    )
};

export default Header;
const styles=StyleSheet.create({
    userImg: {
        width: '100%',
      height: windowHeight/15,
        flex:1, 
        
    },
});