import React from 'react';
import {Box,Text,Image} from 'react-native-design-utility';
import {TouchableOpacity,StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../../constants/Dimensions';
import {theme} from '../../constants/theme';

const FormButton =({buttonTitle, ...rest}) =>{
return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
    <Text style={styles.buttonText}>{buttonTitle}</Text>
  </TouchableOpacity>
)
};
export default FormButton;

const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 10,
      width: '100%',
      height: windowHeight/ 15,
      backgroundColor: theme.color.greenpantone,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
      
    },
  });