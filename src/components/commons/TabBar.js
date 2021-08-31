import React from 'react';
import { Box,Text } from 'react-native-design-utility';
import { useSafeArea } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import { StyleSheet, TouchableOpacity } from 'react-native';


import { routes } from '../../navigations/routes';
import { theme } from '../../constants/theme';
import { metrics } from '../../constants/metrics';
import Player from './Player';

import FeatherIcon from 'react-native-vector-icons/Feather';
const ICONS = {
  [routes.HOME]: 'home',
  [routes.FACEDETECTOR]: 'camera',
  [routes.MUSIC]: 'music',
  [routes.FAVOURITE]: 'heart',

};

const TabBar = props => {
  const insets = useSafeArea();

  const activeTintColor = theme.color.blueDarker;
  const inactiveTintColor = theme.color.greyLight;

  const onTabPress = (routeName, routeIndex) => () => {
    props.navigation.navigate(routeName);
  };

  return (
    <>
      
      <Box
        h={50 + insets.bottom}
        w="100%"
        bg={theme.color.purpleLighter}
        dir="row"
        pb="xs"
        style={{ borderTopWidth: 1, borderTopColor: theme.color.greyLightest }}>
         
        {props.state.routes.map((route, index) => {
          const icon = ICONS[route.name];

          const color =
            props.state.index === index ? activeTintColor : inactiveTintColor;

          return (
            <Box f={1} center key={route.key}>
              <TouchableOpacity
                style={styles.tabBtn}
                onPress={onTabPress(route.name, index)}>
                     <FeatherIcon
                  name={icon}
                  size={metrics.tabIconSize}
                  color={color}
                />
              </TouchableOpacity>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabBar;