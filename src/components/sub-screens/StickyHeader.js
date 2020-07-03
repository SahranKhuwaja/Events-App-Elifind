import React from 'react';
import Styles from '../../styles/Events';
import { View, Text } from 'native-base';

const StickyHeader = (props) => {
    return (
        <View style={Styles.headView}>
            <Text style={Styles.imageHeader}>
                {props.tag !== undefined ? props.tag.toUpperCase() : null}
            </Text>
        </View>
    );
}

export default StickyHeader;