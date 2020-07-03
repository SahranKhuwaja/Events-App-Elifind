import React from 'react';
import {Header,Text,Left,Right,Body,Input,Icon,Button,Item} from 'native-base';
import Styles from '../../styles/Newsfeed';
const NewsfeedHeader = (props)=>{

    return (
        <Header searchBar rounded style={Styles.header}>
          <Item style={Styles.search}>
            <Icon name="ios-search" />
            <Input placeholder="Search People or Events" onChangeText={props.search}/>
            <Icon name="ios-people" />
          </Item>
        </Header>
    )
}

export default NewsfeedHeader;