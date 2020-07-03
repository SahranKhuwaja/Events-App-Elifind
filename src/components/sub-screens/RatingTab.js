import React from 'react';
import { View, Text, Button } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Styles from '../../styles/Events';

const RatingTab = (props) => {
    
    return (
        <View>
            <Text style={Styles.ratingsHeading}>AVERAGE RATING</Text>
            <Rating
                type='star'
                ratingCount={5}
                imageSize={60}
                showRating
                startingValue={parseFloat(props.average)}
                fractions={2}
                readonly={true}
            />
            <Text note style={Styles.totalRatings}>total ({props.total})</Text>
             <Text style={Styles.ratingsHeading}>YOUR RATING</Text>
            <Rating
                type='heart'
                ratingCount={5}
                imageSize={60}
                showRating
                fractions={2}
                startingValue={props.myRating}
                onFinishRating={props.rate}
                readonly={props.myRating!==0}
            />
        </View>
    )


}


export default RatingTab;