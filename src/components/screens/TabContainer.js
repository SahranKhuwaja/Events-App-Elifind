import React, { useEffect, useState } from 'react';
import TabContainer from '../../navigation/TabNavigator';
import Loading from '../sub-screens/Loading';
import { Buffer } from 'buffer';

export default function TabC(props) {

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

    if (loading === false) {
     
        return (
             
            <TabContainer user={user} setStatus={props.route.params.setStatus}/>


        )
    } else {
        return (
            <Loading />
        )
    }
}



