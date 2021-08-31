
import { RouteProp, useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { windowWidth } from '../../constants/Dimensions';
import { Box, Text } from 'react-native-design-utility';
import { theme } from '../../constants/theme';
import { feedUrlServices } from '../../services/FeedUrlServices';
import Header from '../commons/Header';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useRootStore } from '../../context/RootStoreContext';
import { observer } from "mobx-react";

import { itunesApiServices } from '../../services/ItunesApiServices';

const RecommendPodcastScreen = () => {

    const { params } = useRoute();
    const { podcastTopicRecommended } = { ...params };
    const { emotion } = { ...params };
    const [podcasts, setPodcasts] = React.useState([]);
    const [chosedPodcast, setChosenPodcast] = React.useState({});
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
    const ChangeTopic = () => {
        const podcastTopicChanged = emotion.getRecommendedPodcast();
        FindPodcastsList(podcastTopicChanged);

    }




    const FindPodcastsList = ({ podcastTopicRecommended }) => {
        itunesApiServices.searchPodcast(podcastTopicRecommended).then((results) => {
            setPodcasts(results);

        })
    };
    const FindPodcastRecommended = () => {
        console.log('podcast length' + podcasts.length);

        const randomPodcastIndex = Math.floor(Math.random() * podcasts.length);
        console.log('random number: ' + randomPodcastIndex);

        const chosenRandomPodcast = podcasts[randomPodcastIndex];
        if (chosenRandomPodcast) setChosenPodcast(chosenRandomPodcast);
        console.log('chosen podcast' + JSON.stringify(chosedPodcast));
        console.log('random podcast: ' + chosenRandomPodcast);

        const FeedUrl = chosenRandomPodcast.feedUrl;
        console.log('random podcast url : ' + FeedUrl);
        return FeedUrl;
    }

    const SetFeed = (FeedUrl) => {


        feedUrlServices.getFeed(FeedUrl).then(result => {
            setFeed(result);
        });
    }

    const { playerStore } = useRootStore();
    const [feed, setFeed] = React.useState(null);


    React.useEffect(() => {

        FindPodcastsList({ podcastTopicRecommended });
    }, []);

    React.useEffect(() => {
        if (podcasts.length != 0) {
            const FeedUrl = FindPodcastRecommended();

            if (FeedUrl) SetFeed(FeedUrl);
        }

    }, [podcasts]);


    if (!feed) {
        return (<Box f={1} center bg="white">
            <ActivityIndicator color={theme.color.purpleDarker} size="large"></ActivityIndicator>
        </Box>)
    };



    return (
        <Box f={1} bg="white" >




            <FlatList
                ListHeaderComponent={
                    <Box mb="sm">
                        <Header></Header>
                        <Box dir="row" pr="sm" mb="sm">
                            <Box h={100} w={100} mr="xs">
                                <Image source={{ uri: chosedPodcast.artworkUrl100 }} style={{ flex: 1 }} />
                            </Box>
                            <Box center >
                                <Text weight="bold" numberOfLines={2}>{chosedPodcast.trackName}</Text>
                            </Box>
                        </Box>
                        <Box px="sm">
                            <Text>{feed.description}</Text>

                        </Box>
                        <TouchableOpacity onPress={() => { ChangeTopic() }} style={styles.openLinkButton}>

                            <Text style={styles.button_text}>Change podcast recommandation</Text>
                        </TouchableOpacity>
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
                                        // if (links.indexOf(".mp3") == links.length - 4) {
                                        //     track = {
                                        //         id: item.id,
                                        //         url: links,
                                        //         title: item.title,
                                        //         artist: params.podcast.artistName,
                                        //         artwork: item.itunes.image,
                                        //         duration: item.itunes.duration,
                                        //     };
                                        //     console.log('merge cu mp3 ' + links);
                                        //     await playerStore.start(track);
                                        //     console.log(playerStore.currentTrack + 'playing now');
                                        // }
                                        // else {
                                        //     console.log('not mp3');

                                           


                                        // }
                                        setWhatToDisplay(<Link links={links} />)

                                    }}>
                                        <Text numberOfLines={1} weight="bold" size="m" >{item.title}</Text>
                                    </TouchableOpacity>

                                    <Box dir="row">

                                        <Text color="greyLight" weight="bold" mr="sm" size="xs"> {formatDistanceToNow(new Date(item.published), { addSuffix: true })}  </Text>
                                        <Text color="greyLight" size="xs">{item.itunes.duration}  </Text>
                                    </Box>
                                </Box>
                                <TouchableOpacity onPress={() => { alert('put in favourites') }}  >
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

export default observer(RecommendPodcastScreen);

const styles = StyleSheet.create({

    openLinkButton: {

        margin: 10,
        padding: 10,
        backgroundColor: theme.color.africanviolet,
        borderRadius: 10,
        width: windowWidth - 100,
        height: 50,
        alignSelf: 'center'
    },

    button_text: {
        color: theme.color.greyLighter,
        fontSize: 18,
        alignSelf: 'center'
    },
    button: {
        margin: 10,
        padding: 15,
        alignSelf: 'center',
        backgroundColor: theme.color.purpleDark,
        borderRadius: 10,
        width: windowWidth - 100,
        height: 70,
    },

});
