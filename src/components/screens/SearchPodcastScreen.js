import { RouteProp, useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, FlatList, Image, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { theme } from '../../constants/theme';
import {windowHeight, windowWidth} from '../../constants/Dimensions';
import useStatusBar from '../../hooks/useStatusBar';
import { observer } from "mobx-react";
import { itunesApiServices } from '../../services/ItunesApiServices';

import { routes } from '../../navigations/routes';
const Devider = () => <Box h={1} w="100%" bg="greyLightest" ></Box>;
const PodcastTitle = ({ podcast }) => {
    const { navigate } = useNavigation();
    return (
        <Box bg={theme.color.white} >
            <TouchableOpacity onPress={() => navigate(routes.PODCAST, { podcast })}  >
                <Box dir="row" align="center"  >
                    <Box w={100} h={100} radius="xs" style={{ elevation: 3 }} mr="sm" >
                        <Image style={{ flex: 1 }}
                            source={{ uri: podcast.artworkUrl100 }} />
                    </Box>
                    <Box f={1}>
                        <Text numberOfLines={1} size="sm" weight="bold">{podcast.trackName}</Text>
                    </Box>
                </Box>
                <Devider />
            </TouchableOpacity>
        </Box>)
};


const SearchPodcastScreen = () => {
    useStatusBar('dark-content');
    const { params } = useRoute();
    const [podcastsSearch, setPodcastsSearch] = React.useState([]);
    const FindPodcastSearch = () => {

        itunesApiServices.searchPodcast(params.term).then((results) => {
            setPodcastsSearch(results);

        })
    };

    React.useEffect(() => {
        FindPodcastSearch();
    }, []);

    return (
        <View style={{ backgroundColor: theme.color.white }}>
            <View>
                <Image style={styles.userImg} source={require('../../assets/header4.jpg')}></Image>
               
            </View>
            
            <ScrollView style={styles.items}>

                <Text style={styles.text}>Podcast related to: {params.term}</Text>
                <View >
                    {podcastsSearch.map(podcast => (
                        <PodcastTitle podcast={podcast} key={podcast.trackId}>

                        </PodcastTitle>
                    )
                    )
                    }</View>

            </ScrollView>
        </View>

    );


};
export default observer(SearchPodcastScreen);
// export default PodcastScreen;

const styles = StyleSheet.create({
    text: {
        backgroundColor: theme.color.white,
        fontSize: 28,

        paddingTop: 20,
        paddingBottom:20
    },
    userImg: {
        width: '100%',
        height: windowHeight / 15,
        

    },
    items: {
        margin: 10,
     
    }
})