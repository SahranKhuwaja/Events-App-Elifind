import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '../components/sub-screens/Loading';
import Login from '../components/screens/Login'
import Registration from '../components/screens/Registration';
import DrawerContainer from '../components/screens/DrawerContainer';
import axios from 'axios';


const NavSetup = () => {
    const { Screen, Navigator } = createStackNavigator();
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState("");

    useEffect(() => {
        async function session() {

            const request = await axios.get('http://192.168.8.100:3000/User/Profile');
            setStatus(await request.data);
            setLoading(false)
        }
        session();

    }, [])
    if(loading === false){
    if (status === false) {
        return (
            <Navigator screenOptions={{ headerTitleAlign: 'center', headerShown: false }} initialRouteName='LOGIN'>
                <Screen name="LOGIN" component={Login}></Screen>
                <Screen name="REGISTRATION" component={Registration}></Screen>
                <Screen name="DRAWERCONTAINER" component={DrawerContainer}></Screen>
            </Navigator>
        )
    } else {
        return (
            <Navigator screenOptions={{ headerTitleAlign: 'center', headerShown: false }} initialRouteName='DRAWERCONTAINER'>
                <Screen name="DRAWERCONTAINER" component={DrawerContainer} initialParams={{user:status.user}}></Screen>
            </Navigator>
        )
    }
   }
   else{
       return (
           <Loading />
       )
   }



}


const AppConatiner = () => {

    return (
        <NavigationContainer>
            <NavSetup />
        </NavigationContainer>
    )

}

export default AppConatiner