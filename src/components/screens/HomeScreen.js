import React from 'react';
import { Image, TouchableOpacity, ScrollView , StyleSheet, TextInput} from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { theme } from '../../constants/theme';
import { routes } from '../../navigations/routes';
import FeatherIcon from 'react-native-vector-icons/Feather';
import useStatusBar from '../../hooks/useStatusBar';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../navigations/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { itunesApiServices } from '../../services/ItunesApiServices';
import { windowHeight, windowWidth } from '../../constants/Dimensions';

import Header from '../commons/Header';

const PodcastCard = ({ podcast }) => {

    const { navigate } = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigate(routes.PODCAST, { podcast })}  >
            <Box mr="sm" h={160} w={160}>
                <Box w={130} h={130} radius="xs" mr="sm" style={{ elevation: 5 }}>
                    <Image style={{ flex: 1, borderRadius: theme.radius.xs }} source={{ uri: podcast.artworkUrl600 }} />
                </Box>
                <Box f={1} >
                    <Text size="xs" weight="bold" numberOfLines={1}>{podcast.artistName}</Text>
                    <Text size="xs" weight="bold" numberOfLines={1}>{podcast.genres}</Text>
                </Box>
            </Box>
        </TouchableOpacity>)
};

const Category = ({ icon, color, content }) => {
    const bg = `${color}80`;
    const { navigate } = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigate(routes.FAVOURITE, { content }) }>
            <Box center w={75} mr="sm" >
                <Box circle={75} bg={bg} mb="2xs" center><FeatherIcon name={icon} size={25} color='#fff' /></Box>
                
            </Box>
        </TouchableOpacity>
    );
};

const HomeScreen = ({ navigation }) => {
   
    const { navigate } = useNavigation();
    useStatusBar('light-content');
    const { user } = React.useContext(AuthContext);

    const [podcasts, setPodcasts] = React.useState([]);
    const [podcastsCountry, setPodcastsCountry] = React.useState([]);
    const [podcastsTrending, setPodcastsTrending] = React.useState([]);
   
    const [userData, setUserData] = React.useState(null);
    const [term, setTerm] = React.useState('');

    const FirstTopic = userData ? userData.topics[0].item : "happy";
    const userCountry =  userData ? userData.country : "Romania";

    const FindPodcastTrending = () => {
        itunesApiServices.searchPodcast('new').then((results) => {
            setPodcastsTrending(results);

        })
    }
    const FindPodcast = ({ FirstTopic }) => {
        itunesApiServices.searchPodcast({ FirstTopic }).then((results) => {
            setPodcasts(results);

        })
    }
    const FindPodcastCountry = ({ userCountry }) => {
        itunesApiServices.searchPodcast(userCountry).then((results) => {
            setPodcastsCountry(results);

        })
    }
    const getUser = async () => {
        await firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {

                    setUserData(documentSnapshot.data());
                }
            })
    };
   
    React.useEffect(() => {
        getUser();

        FindPodcast({ FirstTopic });
        FindPodcastTrending(); 
        FindPodcastCountry({ userCountry });
       
    }, [FirstTopic, userCountry]);

    return (
        <Box f={1} bg={theme.color.white}>
            <ScrollView>
                 <Header /> 
                <Box style={styles.backgroundSearchStyle}>
                    <FeatherIcon name='search' style={styles.iconStyle} />
                        <TextInput
                            placeholder="Search"
                            style={styles.inputStyle}
                            value={term}
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={setTerm}
                            onEndEditing={() => { alert(term);   console.log(term);navigate(routes.SEARCH, {term})  }}
                            keyboardAppearance='dark'
                        />
                </Box>

                <Box mb="sm">
                    <Box ml="sm" mb="sm">
                        <Text size="xl" weight="bold" color={theme.color.blueDarkest}>Trending</Text>
                    </Box>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginLeft: theme.space.sm }}>
                        {podcastsTrending.map(podcast => (
                            <PodcastCard podcast={podcast} key={podcast.trackId}></PodcastCard>)
                        )
                        }
                    </ScrollView>
                </Box>

                <Box >
                    <Box ml="sm" mb="sm">
                        <Text color={theme.color.blueDarkest} size="xl" weight="bold">
                            Emotions
                        </Text>
                    </Box>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginLeft: theme.space.sm }}>
                        <Box dir="row">
                            <Category icon="smile" color={theme.color.greenpantone}  content="happiness"/>
                            <Category icon="frown" color={theme.color.cyberyellow} content="angry" />
                            <Category icon="meh" color={theme.color.africanviolet} content="contempt"/>
                            <Category icon="heart" color={theme.color.red} content="surprise"/>
                            <Category icon="meh" color={theme.color.blueDark} content="fear"/>
                        </Box>
                    </ScrollView>
                </Box>
                <Box mb="sm" mt="sm">
                    <Box ml="sm" mb="sm">
                        <Text size="xl" weight="bold" color={theme.color.blueDarkest}>From your country</Text>
                    </Box>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginLeft: theme.space.sm }}>
                        {podcastsCountry.map(podcast => (
                            <PodcastCard podcast={podcast} key={podcast.trackId}></PodcastCard>))
                        }
                    </ScrollView>
                </Box>
                <Box mb="sm">
                    <Box ml="sm" mb="sm">
                        <Text size="xl" weight="bold" color={theme.color.blueDarkest}>Favourites</Text>
                    </Box>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginLeft: theme.space.sm }}>
                        {podcasts.map(podcast => (
                            <PodcastCard podcast={podcast} key={podcast.trackId}></PodcastCard>)
                        )
                        }
                    </ScrollView>
                </Box>
            </ScrollView>
        </Box>
    );
};
export default HomeScreen;
const styles = StyleSheet.create({
    backgroundSearchStyle: {
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: theme.color.africanviolet,
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        marginBottom:10
    },
    inputStyle: {
        flex: 1,
        fontSize: 18

    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    }
});