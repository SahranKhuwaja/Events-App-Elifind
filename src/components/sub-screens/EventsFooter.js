import React from 'react';
import { Footer, Thumbnail } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Styles from '../../styles/Events.js';

const EventsFooter = (props) => {

    return (
        <Footer style={Styles.footer}>
            <TouchableOpacity onPress={props.createEvent}>
                <Thumbnail source={require('../../assets/images/add.png')} large style={Styles.plus}></Thumbnail>
            </TouchableOpacity>
        </Footer>
    )
}

export default EventsFooter;



