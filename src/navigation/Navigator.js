import React, { useEffect, useState,useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '../components/sub-screens/Loading';
import Login from '../components/screens/Login'
import Registration from '../components/screens/Registration';
import TabContainer from '../components/screens/TabContainer';
import axios from 'axios';


const NavSetup = () => {
    const { Screen, Navigator } = createStackNavigator();
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState("");

    async function logout(){
        setLoading(true)
        const request = await axios.post('https://events-app-elifind.herokuapp.com/User/Logout');
        if(request.data===true){
            setStatus(false)
            setLoading(false)
        }
       
    }

    useEffect(() => {
        async function session() {

            const request = await axios.get('https://events-app-elifind.herokuapp.com/User/Profile');
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
                <Screen name="TABCONTAINER" component={TabContainer} initialParams={{user:status.user,setStatus:logout.bind(this)}}></Screen>
            </Navigator>
        )
    } else {
        return (
            <Navigator screenOptions={{ headerTitleAlign: 'center', headerShown: false }} initialRouteName='TABCONTAINER'>
                <Screen name="TABCONTAINER" component={TabContainer} initialParams={{user:status.user,setStatus:logout.bind(this)}} ></Screen>
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