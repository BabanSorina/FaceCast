import React from 'react';
import { theme } from '../../constants/theme';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList, TouchableOpacity
} from 'react-native';
import { Box } from 'react-native-design-utility';

import { useWindowDimensions } from 'react-native';

//import NativeModules, { ImagePickerManager } from 'NativeModules';

import * as ImagePicker from 'react-native-image-picker';
import routes from '../../navigations/routes';

import Button from './Button';

import RNFetchBlob from 'react-native-fetch-blob';
// import { NativeModules } from 'react-native';
// const RNFetchBlob = NativeModules.RNFetchBlob;
import _ from 'lodash';
import { PermissionsAndroid } from 'react-native';

import EmotionsModel from './Emotions';
import RecommendPodcastScreen from '../screens/RecommendPodcast';

class Detector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photo_style: {
        position: 'absolute',
        width: 480,
        height: 480
      },
      has_photo: false,
      photo: null,
      face_data: null,
      has_data: false
    };
  }


  render() {

    return (
      <Box style={styles.container}>
        <Box>
          <Image
            style={this.state.photo_style}
            source={this.state.photo}
            resizeMode="contain" />
        </Box>
        <Box style={{ paddingTop: 320 }}>
          <Button
            text="Pick Photo "
            onpress={this._pickImage.bind(this)}
            button_styles={styles.button}
            button_text_styles={styles.button_text} />
          {this._renderDetectFacesButton.call(this)}
          {this._renderFINDPODCASTBUTTON.call(this)}
        </Box>



      </Box>
    );
  };

  _navigateRecommand() {
    let views = _.map(this.state.face_data, (x, index) => {

      const emotions = x.faceAttributes.emotion;
      const emotion = new EmotionsModel({ ...emotions, topics: [...this.props.topics] });
      console.log("topicuri user detector:" + this.props.topics);

      const podcastTopicRecommended = emotion.getRecommendedPodcast();
      alert(JSON.stringify(podcastTopicRecommended));

      this.props.navigation.navigate('Recommend', { podcastTopicRecommended, emotion });

    })

  };
  _pickImage() {
    this.setState({
      face_data: null
    });
    ImagePicker.showImagePicker(this.props.imagePickerOptions, (response) => {
      if (response.error) {
        alert('Error getting the image. Please try again.');
      } else {
        let source = { uri: response.uri };
        this.setState({
          photo_style: {
            position: 'absolute',
            width: response.width,
            height: response.height
          },
          has_photo: true,
          photo: source,
          photo_data: response.data,
          has_data: false
        });
      }
    });
  }
  _renderFINDPODCASTBUTTON() {

    if (this.state.has_data) {
      return (
        <Button
          text="Find podcast"
          onpress={this._navigateRecommand.bind(this)}
          button_styles={styles.button}
          button_text_styles={styles.button_text} />
      );
    }
  };


  _renderDetectFacesButton() {
    if (this.state.has_photo) {
      return (
        <Button
          text="Find emotion"
          onpress={this._detectFaces.bind(this)}
          button_styles={styles.button}
          button_text_styles={styles.button_text} />
      );
    }
  };
  _detectFaces() {
    RNFetchBlob.fetch('POST',
      'https://facecast1.cognitiveservices.azure.com/face/v1.0/detect?detectionModel=detection_01&returnFaceId=true&returnFaceAttributes=age,emotion', {
      'Accept': 'application/json',
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': this.props.apiKey
    }, this.state.photo_data)
      .then((res) => { return res.json(); })
      .then((json) => {
        if (json.length) {
          this.setState({ face_data: json, has_data: true });
        }
        else { alert("Sorry, I can't see any faces in there."); }
        return json;
      })
      .catch(function (error) {
        console.log(error);
        alert('Sorry, the request failed. Please try again.' + JSON.stringify(error));
      });

  };



}
const dimensions = useWindowDimensions();
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white,
  },
  details: {
    flex: 1,
    alignItems: 'center',
    fontSize: 30
  },
  button: {
    margin: 10,
    padding: 15,
    backgroundColor: theme.color.africanviolet,
    borderRadius: 10,
    width: dimensions.width - 50,
    height: 70,
  },
  button_text: {
    color: theme.color.greyLighter,
    fontSize: 20,
    alignSelf: 'center'
  }
});

export { Detector };