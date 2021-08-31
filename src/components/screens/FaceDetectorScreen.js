import React, { useState, useEffect, useContext } from 'react';
import { Box, Text } from 'react-native-design-utility';
import { theme } from '../../constants/theme';
import { View, StyleSheet } from 'react-native';
import { Detector } from '../facedetector/Detector';
import { Image } from 'react-native'
import Header from '../commons/Header';
import { windowHeight, windowWidth } from '../../constants/Dimensions';
import { useNavigation } from '@react-navigation/native';
const image_picker_options = {
  title: 'Select Photo',
  takePhotoButtonTitle: 'Take Photo...',
  chooseFromLibraryButtonTitle: 'Choose from Library...',
  cameraType: 'back',
  mediaType: 'photo',
  maxWidth: 480,
  quality: 1,
  noData: false,
  path: 'images'
};
import firestore from '@react-native-firebase/firestore';
const api_key = 'b47738337e7c4a22b484ab592c0f8b45';
import { AuthContext } from '../../navigations/AuthProvider';

const FaceDetectorScreen = () => {
  const { userProfile } = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <Box style={styles.container} >
      <Box>
        <Image style={styles.userImg} source={require('../../assets/header4.jpg')}></Image>
      </Box>

      <Box style={styles.textcontainer}>
        <Text style={styles.text}>Use a photo to find your special playlist based on your emotion</Text>
      </Box>
      <Detector topics={userProfile?.topics} navigation={navigation} imagePickerOptions={image_picker_options}
        apiKey={api_key} />
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  text: {
    fontSize: 20,

  },
  textcontainer: { marginTop: 25, marginLeft: 10 },
  userImg: {
    width: '100%',
    height: windowHeight / 15,
  

  },

});

export default FaceDetectorScreen;