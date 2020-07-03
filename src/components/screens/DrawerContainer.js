import React, { useEffect, useState } from 'react';
import DrawerContainer from '../../navigation/DrawerNavigator';


export default function App(props) {

    
    return (

     <DrawerContainer user={props.route.params.user} setStatus={props.route.params.setStatus} />
   
    
    )
    
} 



