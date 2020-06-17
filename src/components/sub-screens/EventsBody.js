import React from 'react';
import { Content, Thumbnail, Item, Card, CardItem, Text, View } from 'native-base';
import { Image, FlatList } from 'react-native';
import Styles from '../../styles/Events';

const EventsBody = (props) => {

    if (props.events.length === 0) {
        return (
            <Content padder>
                <Text style={Styles.notFoundText}>
                    NO EVENTS FOUND!
                    </Text>
                <Image source={require('../../assets/images/notFound.png')}
                    style={Styles.image}></Image>
            </Content>
        )
    } else {
        return (
            <FlatList
                data={props.events.reverse()}
                numColumns={1}
                keyExtractor={item => item._id + Math.random()}
                renderItem={props.renderItem}
                style={Styles.flatlist}
                ListFooterComponent={()=>(<Text notes style={{marginTop:70,marginBottom:20,alignSelf:'center'}}> {'\u00A9'}Elifind Events App. All rights reserved.</Text>)}>
            </FlatList>
        )
    }
}

export default EventsBody;