import React from 'react';
import {Text,View} from 'native-base';
import Styles from '../../styles/Events';

const DetailsTab = (props)=>{

    return(
        <View style={Styles.tabSection2}>
            <Text style={Styles.eventHeading}>About Event</Text>
            <Text>{props.details}</Text>
            <Text style={Styles.eventHeading}>Type</Text>
            <Text>{props.type}</Text>
            <Text style={Styles.eventHeading}>Category</Text>
            <Text>{props.category}</Text>
        </View>
    )
}

export default DetailsTab;