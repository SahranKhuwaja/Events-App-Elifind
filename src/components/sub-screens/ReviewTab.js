import React from 'react';
import { View, Text, Button, Card, CardItem, Thumbnail, Left, Body, Right, Icon, Textarea } from 'native-base';
import Styles from '../../styles/Events';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {FlatList} from 'react-native';
const ReviewTab = (props) => {

    return (
        <View style={Styles.tabSection2}>
            <Card style={{ flex: 0 }}>
                <CardItem>
                    <Left>
                        {props.data.Dp !== undefined ?
                            <Thumbnail source={{ uri: `data:image/png;base64,${props.data.Dp}` }} />
                            :
                            <Thumbnail source={require('../../assets/images/logo.png')} />
                        }
                        <Body>
                            <Text style={Styles.nameLabel}>{props.data.FirstName} {props.data.LastName}</Text>
                        </Body>
                        <Rating
                                type='star'
                                ratingCount={5}
                                imageSize={20}
                                startingValue={props.myRating}
                                fractions={2}
                                readonly={true}/>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <Textarea rowSpan={5} style={{ ...Styles.viewPost, ...Styles.review }} placeholder="Write your reviews here!"
                        onChangeText={props.setReview} value={props.reviewText} />
                    </Body>
                </CardItem>
                <CardItem>
                    <Left />

                    <Body>
                        <Button onPress={props.review}><Text>Review</Text></Button>
                    </Body>

                    <Right />
                </CardItem>
            </Card>
            <Text style={Styles.ratingsHeading}>REVIEWS</Text>
            <FlatList
                data={props.reviews}
                numColumns={1}
                keyExtractor={item => item._id + Math.random() + 'sahran'}
                renderItem={props.renderReviews}
                style={Styles.flatlist}
                ListFooterComponent={()=>(<Text notes style={Styles.footText}> {'\u00A9'}Elifind Events App. All rights reserved.</Text>)}>
        </FlatList>

        </View>
    )


}


export default ReviewTab;