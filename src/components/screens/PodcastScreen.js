import { RouteProp, useRoute, useCallback } from '@react-navigation/core';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, TouchableOpacity, Alert, Button, Linking, StyleSheet } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { theme } from '../../constants/theme';
import { feedUrlServices } from '../../services/FeedUrlServices';
import useStatusBar from '../../hooks/useStatusBar';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useRootStore } from '../../context/RootStoreContext';
import { observer } from "mobx-react";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Header from '../commons/Header';




const PodcastScreen = () => {
    const [userData, setUserData] = useState(null);
    useStatusBar('dark-content');
    const { playerStore } = useRootStore();
    const { params } = useRoute();
    const [feed, setFeed] = React.useState(null);
    const [whatToDisplay, setWhatToDisplay] = React.useState(null);


    const Link = ({ links }) => {
        console.log('open the browser');
        return (
            <TouchableOpacity style={styles.openLinkButton}
                onPress={() => {
                    Linking.openURL(links)
                        .catch(err => {
                            console.error("Failed opening page because: ", err);
                            alert('Failed to open page');

                        })
                    console.log('open the page');
                }}>
                <Text style={styles.button_text}>Click to go to the podcast</Text>
            </TouchableOpacity>
        )

    }

    const getUser = async () => {

        await firestore().collection('users').doc(auth().currentUser.uid).get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    setUserData(documentSnapshot.data());
                }

            })
    };

    const updateUser = async () => {
        await firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .update({

                favourites: userData.favourites
            })
            .then(() => {
                console.log('User Updated!');

                alert(
                    'Profile Updated!',
                    'Your profile has been updated successfully.'
                );
            })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            });
    };

    React.useEffect(() => {
        feedUrlServices.getFeed(params.podcast.feedUrl).then(result => {
            
            setFeed(result);
        });
        getUser();
        
    }), [];
    // React.useEffect(() => {
    //     updateUser();
        
    // }), [params.podcast.feedUrl];
    if (!feed) {
        return (<Box f={1} center bg="white">
            <ActivityIndicator color={theme.color.purpleDarker} size="large"></ActivityIndicator>
        </Box>)
    };
    return (
        <Box f={1} bg="white" >
            
            <FlatList
                ListHeaderComponent={
                    <Box mb="sm" >
                        <Header></Header>
                        <Box dir="row" pr="sm" mb="sm">
                            <Box h={100} w={100} mr="xs">
                                <Image source={{ uri: params.podcast.artworkUrl100 }} style={{ flex: 1 }} />
                            </Box>
                            <Box center >
                                <Text weight="bold" numberOfLines={2}>{params.podcast.trackName}</Text>
                            </Box>
                        </Box>
                        <Box px="sm">
                            <Text>{feed.description}</Text>
                        </Box>
                        {whatToDisplay}

                    </Box>
                }
                data={feed.items}
                renderItem={({ item }) => {

                    return (
                        <Box>
                            <Box px="sm" py="sm" dir="row" align="center" justify="between">
                                <Box f={1}>
                                    <TouchableOpacity onPress={async () => {
                                        const links = item.links[0].url;
                                        console.log(links);
                                        setWhatToDisplay(<Link links={links} />)
                                    }}>

                                        <Text numberOfLines={1} weight="bold" size="m" >{item.title}</Text>
                                    </TouchableOpacity>

                                    <Box dir="row">

                                        <Text color="greyLight" weight="bold" mr="sm" size="xs"> {formatDistanceToNow(new Date(item.published), { addSuffix: true })}  </Text>
                                        <Text color="greyLight" size="xs">{item.itunes.duration}  </Text>
                                    </Box>

                                </Box>
                                <TouchableOpacity onPress={() => {
                                    console.log(params.podcast.feedUrl);
                                     setUserData({ ...userData, favourites:params.podcast.feedUrl });
                                     console.log('favourites :'+userData.favourites);
                                    updateUser();
                                    console.log('favourites after update:'+userData.favourites);
                                }}  >
                                    <Box w={50} align="end" >
                                        <FeatherIcon name="heart" size={23} color={theme.color.africanviolet} backgroundColor={theme.color.purple} />
                                    </Box>
                                </TouchableOpacity>

                            </Box>
                            <Box w="100%" h={1} bg="greyLightest"></Box>
                        </Box>

                    )
                }}
                keyExtractor={item => item.id}
            />

        </Box>
    )
};
export default observer(PodcastScreen);
// export default PodcastScreen;


const styles = StyleSheet.create({
    openLinkButton: {

        margin: 10,
        padding: 10,
        backgroundColor: theme.color.africanviolet,
        borderRadius: 10,
        height: 50
    },

    button_text: {
        color: theme.color.greyLighter,
        fontSize: 18,
        alignSelf: 'center'
    }
});