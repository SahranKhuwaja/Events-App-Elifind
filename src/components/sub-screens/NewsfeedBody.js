import React from 'react';
import {Text} from 'native-base';
import {FlatList} from 'react-native';
import Styles from '../../styles/Newsfeed';
const NewsfeedBody = (props)=>{

    return (
   
       <FlatList
                data={(props.filter.length!==0)||(!props.found)?props.filter:props.events}
                numColumns={1}
                keyExtractor={item => item._id + Math.random()}
                renderItem={props.renderItem}
                style={Styles.flatlist}
                ListFooterComponent={()=>(<Text notes style={Styles.footText}> {'\u00A9'}Elifind Events App. All rights reserved.</Text>)}>
        </FlatList>
    
    )
}

export default NewsfeedBody;