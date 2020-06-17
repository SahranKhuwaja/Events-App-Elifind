import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'native-base';
//import styles from '../styles/DrawerNavigator';
import DrawerNavigator from './DrawerNavigator';

const NavSetup = (props) => {

    const { Screen, Navigator } = createBottomTabNavigator();
    return (

        <Navigator initialRouteName="HOME">

            <Screen name='HOME'/>
            <Screen name='NEWSFEED'></Screen>
        </Navigator>


    );

}



const TabContainer = (props) => {

    return (
        <NavigationContainer independent={true}>
            <NavSetup/>
        </NavigationContainer>
    )

}

export default TabContainer;
