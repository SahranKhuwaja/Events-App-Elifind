import React from 'react';
import { Left, Right, Button, Body, Text, Thumbnail, Icon, CardItem, Card, Item, View } from 'native-base';
import { Image } from 'react-native';
import moment from 'moment';
import Styles from '../../styles/Events';

const PostCardItem = (props) => {

    return (
        <Card style={Styles.postCard}>
            <CardItem>
                <Left>
                    <Thumbnail source={props.user.Dp!==undefined?{ uri: `data:image/png;base64,${props.user.Dp}` }:
                           require('../../assets/images/user.jpg')} style={Styles.postDp} />
                    <Body>
                        <Text style={Styles.nameLabel}>{props.user.FirstName} {props.user.LastName}
                        <Text note style={Styles.notes}> posted about event</Text></Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem cardBody>
               <Text style={Styles.postBody}>{props.item.Post}</Text>
            </CardItem>
            <CardItem>
                <Left>
                   <Text note>{moment(props.item.createdAt).fromNow()}</Text>
                </Left>
            </CardItem>
        </Card>
    )



}

export default PostCardItem;