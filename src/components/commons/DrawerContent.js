import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'
import { Box } from 'react-native-design-utility';
import { routes } from '../../navigations/routes';
import { theme } from '../../constants/theme';
import firestore from '@react-native-firebase/firestore';
import { useWindowDimensions } from 'react-native';
import { AuthContext } from '../../navigations/AuthProvider';

//import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import FeatherIcon from 'react-native-vector-icons/Feather';

function DrawerContent(props) {
    const { user, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
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
    }, []);
 
    const dimensions = useWindowDimensions();
    return (

        <View style={styles.drawerContent}>
            <DrawerContentScrollView {...props}>
                <TouchableOpacity style={styles.userInfoSection}>
                    <View style={{ marginTop: 15 }}>
                        <Box circle={100} bg={theme.color.purpleLightest} mb="2xs" center><FeatherIcon name="user" size={40} color={theme.color.blueDarkest} /></Box>
                        <View style={{ marginTop: 15, marginLeft: 30, flexDirection: 'column' }}>
                            <Text style={styles.userInfo}>{userData ? userData.fname + " " + userData.lname : ''}</Text>
                            <Text style={styles.userInfo} >{userData ? userData.age + " years old" : ''}</Text>
                        </View>

                    </View>
                </TouchableOpacity>
                <Box w="100%" h={3} r={1} style={{ backgroundColor: theme.color.purpleLightest }}></Box>
                <TouchableOpacity>
                    <DrawerItem style={styles.drawerSection}
                        icon={({ color, size }) => (
                            <FeatherIcon
                                name="home"
                                color={theme.color.darkpurple}
                                size={30}
                            />
                        )}
                        label={() => (<Text style={styles.paragraph}>Home</Text>)}
                        onPress={() => { props.navigation.navigate(routes.HOME) }}
                    />
                </TouchableOpacity>
                <Box w="100%" h={1} style={{ backgroundColor: theme.color.purpleLightest }}></Box>
                <TouchableOpacity>
                    <DrawerItem style={styles.drawerSection}
                        icon={({ color, size }) => (
                            <FeatherIcon
                                name="user"
                                color={theme.color.darkpurple}
                                size={size}
                            />
                        )}
                        label={() => (<Text style={styles.paragraph}>Profile</Text>)}
                        onPress={() => { props.navigation.navigate(routes.PROFILE) }}
                    />
                </TouchableOpacity>
                <Box w="100%" h={1} style={{ backgroundColor: theme.color.purpleLightest }}></Box>
               
                
                {/* <TouchableOpacity>
                    <DrawerItem style={styles.drawerSection}
                        icon={({ color, size }) => (
                            <FeatherIcon
                                name="settings"
                                color={theme.color.blueDarkest}
                                size={size}
                            />
                        )}
                        label={() => (<Text style={styles.paragraph}>Settings</Text>)}
                        onPress={() => { props.navigation.navigate(routes.SETTINGS) }}
                    />
                </TouchableOpacity> */}
                <Box w="100%" h={1} style={{ backgroundColor: theme.color.purpleLightest }}></Box>
                <TouchableOpacity>
                    <DrawerItem style={styles.drawerSection}
                        icon={({ color, size }) => (
                            <FeatherIcon
                                name="help-circle"
                                color={theme.color.blueDarkest}
                                size={size}

                            />
                        )}
                        label={() => (<Text style={styles.paragraph}>Support</Text>)}
                        onPress={() => { props.navigation.navigate(routes.SUPPORT) }}
                    />
                </TouchableOpacity>
                <Box   w="100%" h={3} style={{ backgroundColor: theme.color.purpleLightest }}></Box>
                <DrawerItem style={styles.drawerSection}
                    icon={() => (
                        <ToggleSwitch
                            isOn={false}
                            onColor={theme.color.purpleLighter}
                            offColor={theme.color.purpleDark}
                            size="medium"
                            onToggle={isOn => console.log("changed to : ", isOn)}
                        />)}
                    label={() => (<Text style={styles.paragraph}>Dark theme</Text>)} >
                </DrawerItem>

            </DrawerContentScrollView>

            <TouchableOpacity  >
                <DrawerItem icon={({ size }) => (
                    <FeatherIcon
                        name="log-out"
                        color={theme.color.purpleDarkest}
                        size={size}
                        onPress={async () =>{ await logout(user.email,user.password); console.log('logout')}}
                    />
                )} style={styles.bottomDrawerSection} label={() => (<Text style={styles.logoutSign}>Log-out</Text>)} />
                </TouchableOpacity>



        </View>






    )
}
export default DrawerContent;


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        backgroundColor: theme.color.africanviolet,
    },
    userInfoSection: {
        paddingLeft: 20,
        paddingBottom: 20,
    },

    logoutSign: {
        fontSize: 17,
        marginRight: 3,
        color: theme.color.purpleDarkest,
        fontWeight: 'bold',
    },
    paragraph: {
        fontSize: 15,
        marginRight: 3,
        color: theme.color.darkpurple,

    },
    drawerSection: {
        marginTop: 5,

    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: theme.color.purpleLightest,
        borderTopWidth: 3
    },
    userInfo: {
        fontSize: 15,
        marginRight: 3,
        color: theme.color.purpleLightest,
        fontWeight: 'bold',
    }
});