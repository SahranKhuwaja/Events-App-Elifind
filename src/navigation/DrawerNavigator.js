import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Profile from '../components/screens/Profile';
import Events from '../components/screens/Events';
import Settings from '../components/screens/Settings';
import { Icon } from 'native-base';
import styles from '../styles/DrawerNavigator';
import DrawerCustomContent from '../components/sub-screens/DrawerCustomContent';
import { YellowBox } from 'react-native';

const NavSetup = (props) => {
    
    const { Screen, Navigator } = createDrawerNavigator();
    YellowBox.ignoreWarnings([
        'Non-serializable values were found in the navigation state',
      ]);
    return (

        <Navigator initialRouteName="Profile" drawerContentOptions={{
            activeTintColor: 'darkblue', activeBackgroundColor: '#F3F0F0',
            itemStyle: styles.item, labelStyle: styles.label
        }} drawerContent={(props) => <DrawerCustomContent {...props} />} drawerStyle={{ width: '85%' }}
        >

            <Screen name='Profile' component={Profile} options={{
                drawerIcon: () => <Icon name="person"
                    style={styles.icon}></Icon>
            }} initialParams={{ user: props.user, setStatus:props.setStatus}} />
            <Screen name='My Events' component={Events} options={{
                drawerIcon: () => <Icon name="calendar"
                    style={styles.icon}></Icon>
            }} initialParams={{user:props.user }} ></Screen>

            <Screen name='Settings' component={Settings} options={{
                drawerIcon: () => <Icon name="cog" type="FontAwesome5"
                    style={styles.icon2}></Icon>
            }} initialParams={{ user: props.user }}  ></Screen>
        </Navigator>


    );

}



const DrawerContainer = (props) => {
    return (
        <NavigationContainer independent={true}>
            <NavSetup setStatus={props.setStatus} user={props.user}/>
        </NavigationContainer>
    )

}

export default DrawerContainer;
