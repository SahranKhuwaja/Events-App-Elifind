import React from 'react';
import { Footer, Thumbnail,Fab } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Styles from '../../styles/Events.js';

const EventsFooter = (props) => {

    return (
        <Fab onPress={props.createEvent}>
            <TouchableOpacity  onPress={props.createEvent}>
                <Thumbnail source={require('../../assets/images/add.png')} large style={Styles.plus}></Thumbnail>
            </TouchableOpacity>
        </Fab>
    )
}

export default EventsFooter;



