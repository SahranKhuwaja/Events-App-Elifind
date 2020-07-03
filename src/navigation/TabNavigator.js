import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'native-base';
import DrawerComponent from '../components/screens/DrawerContainer';
import NewsfeedComponent from '../components/screens/Newsfeed';

const NavSetup = (props) => {

    const { Screen, Navigator } = createBottomTabNavigator();
    return (
       
        <Navigator initialRouteName="HOME" 
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'HOME') {
                iconName = focused
                  ? 'ios-home'
                  : 'home';
              } else if (route.name === 'NEWSFEED') {
                iconName = focused ? 'ios-paper' : 'paper';
              }
              return <Icon name={iconName} style={{color}} type="Ionicons"/>;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'darkblue',
            inactiveTintColor: 'gray',
           
          }}>

            <Screen name='HOME' component={DrawerComponent} initialParams={{user:props.user,setStatus:props.setStatus}}/>
            <Screen name='NEWSFEED' component={NewsfeedComponent}></Screen>
        </Navigator>


    );

}



const TabContainer = (props) => {

    return (
        <NavigationContainer independent={true}>
            <NavSetup user={props.user} setStatus={props.setStatus} />
        </NavigationContainer>
    )

}

export default TabContainer;
