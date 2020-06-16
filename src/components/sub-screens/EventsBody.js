import React from 'react';
import {Content,Thumbnail,Item,Card,CardItem,Text} from 'native-base';
import {Image} from 'react-native';
import Styles from '../../styles/Events';

const EventsBody = (props)=>{

    return(
        <Content padder>
            <Text style={Styles.notFoundText}>
                NO EVENTS FOUND!
            </Text>
            <Image source={require('../../assets/images/notFound.png')} 
            style={Styles.image}></Image>
         
        </Content>
    )
}

export default EventsBody;