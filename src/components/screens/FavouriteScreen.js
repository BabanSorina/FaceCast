import React from 'react';
import { Button } from 'react-native';
import { theme } from '../../constants/theme';
import { routes } from '../../navigations/routes';
import useStatusBar from '../../hooks/useStatusBar';
import { Image, TouchableOpacity, ScrollView } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { itunesApiServices } from '../../services/ItunesApiServices';
import Header from '../commons/Header';
import { RouteProp, useRoute, useCallback } from '@react-navigation/core';

const Devider = () => <Box h={1} w="100%" bg="greyLightest" ></Box>;
const PodcastTitle = ({ podcast }) => {
    const { navigate } = useNavigation();
    return (
        <Box f={1} bg={theme.color.white}>
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
const FavouriteScreen = () => {
    const { navigate } = useNavigation();
    useStatusBar('light-content');
    const { params } = useRoute();
    const [podcasts, setPodcasts] = React.useState([]);
    const FindPodcast = () => {
        itunesApiServices.searchPodcast(params.content).then((results) => {
            setPodcasts(results);

        })
    }
    React.useEffect(() => {
        FindPodcast();
    }, []);
    return (
        <Box g={theme.color.white}>
            <ScrollView >
            <Header />
                {podcasts.map(podcast => (
                    <PodcastTitle podcast={podcast} key={podcast.trackId}></PodcastTitle>
                )
                )
                }
            </ScrollView>
        </Box>

    );
};
export default FavouriteScreen;