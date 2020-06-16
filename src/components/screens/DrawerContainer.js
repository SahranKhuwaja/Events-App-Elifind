import React, { useEffect, useState } from 'react';
import DrawerContainer from '../../navigation/DrawerNavigator';
import Loading from '../sub-screens/Loading';
import {Buffer} from 'buffer';

export default function App(props) {

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState("");
  const userInfo = props.route.params.user;
  useEffect(() => {
    async function userData() {

      if (userInfo.Dp !== undefined) {
        userInfo.Dp = await Buffer.from(userInfo.Dp).toString('base64');
      }
      setUser(await userInfo);
      setLoading(false)
    }
    userData();

  }, [])
    
    if(loading === false){
    return (

      <DrawerContainer user={user} />
   
  
      )
    }else{
      return (
        <Loading />
      )
    } 
     } 



