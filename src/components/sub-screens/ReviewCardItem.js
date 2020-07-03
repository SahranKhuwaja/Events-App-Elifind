import React from 'react';
import { Left, Right, Button, Body, Text, Thumbnail, Icon, CardItem, Card, Item, View } from 'native-base';
import { Image } from 'react-native';
import moment from 'moment';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Styles from '../../styles/Events';

const ReviewCardItem = (props) => {

    return (
        <Card style={{ flex: 0 }}>
            <CardItem>
                <Left>
                    {props.item.Dp !== undefined ?
                        <Thumbnail source={{ uri: `data:image/png;base64,${props.item.Dp}` }} />
                        :
                        <Thumbnail source={require('../../assets/images/user.jpg')} />
                    }
                    <Body>
                        <Text style={Styles.nameLabel}>{props.item.FirstName} {props.item.LastName}</Text>
                    </Body>
                    <Rating
                        type='star'
                        ratingCount={5}
                        imageSize={20}
                        startingValue={props.item.Rating}
                        fractions={2}
                        readonly={true} />
                </Left>
            </CardItem>
            <CardItem>
                <Text>{props.item.Review}</Text>
            </CardItem>
            <CardItem>
                <Left>
                <Text note>{moment(props.item.createdAt).fromNow()}</Text>
                </Left>
            </CardItem>
        </Card>
    )



}

export default ReviewCardItem;