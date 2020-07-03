import React from 'react';
import { Left, Right, Button, Body, Text, Thumbnail, Icon, CardItem, Card, Item, View } from 'native-base';
import { Image } from 'react-native';
import moment from 'moment';
import Styles from '../../styles/Newsfeed';

const NewsfeedCardItem = (props) => {

    return (
        <Card>
            <CardItem>
                <Left>
                    <Thumbnail source={props.item.Dp!==undefined?{ uri: `data:image/png;base64,${props.item.Dp}` }:
                        require('../../assets/images/user.jpg')} style={Styles.postDp} />
                    <Body>

                        <Text style={Styles.nameLabel}>{props.item.FirstName} {props.item.LastName}
                            <Text note style={Styles.notes}> created an event</Text></Text>
                        <Text style={Styles.eventLabel} onPress={props.open.bind(this,props.item._id)}>{props.item.Name}</Text>
                        <Text note>{props.item.Category}, {props.item.Type}</Text>

                    </Body>
                </Left>
            </CardItem>
            <CardItem cardBody>
                <Image source={require('../../assets/images/event-dp.png')} style={{ height: 200, width: null, flex: 1 }} />
            </CardItem>
            <CardItem>
                <Body>
                    <View style={Styles.view}>
                        <Icon name="calendar" style={Styles.icon}></Icon>
                        <Text note style={Styles.text}> Schedule at {props.item.ScheduleAt} on {moment(props.item.createdAt).format('ddd, MMM D YYYY')}</Text>
                    </View>
                    <View style={Styles.view}>
                        <Icon name="map-marker-alt" style={Styles.icon2} type="FontAwesome5"></Icon>
                        <Text note style={Styles.text}> At {props.item.Location}{props.item.Type === 'Virtual' ? ' (online) from' : ','} {props.item.City + ','} {props.item.Country}</Text>
                    </View>
                    <Text style={Styles.text2}>Description</Text>
                    <Text note>{props.item.Description} </Text>
                </Body>
            </CardItem>
            <CardItem>
                <Left>
                    <Button transparent textStyle={{ color: '#87838B' }}>
                        <Icon name="ios-people" />
                        <Text>{props.item.Participants} Participants</Text>
                    </Button>
                </Left>
              
                {!props.item.Host ?
                    <Right>
                        {
                        props.item.Joined?
                        <Button iconLeft transparent disabled style={Styles.joined}>
                            <Icon name="checkmark"></Icon>
                            <Text>Joined</Text>
                        </Button>
                        :
                        <Button iconLeft transparent onPress={props.join}>
                            <Text>Join</Text>
                        </Button>
                        }
                    </Right>
                    : null}
            </CardItem>
        </Card>
    )



}

export default NewsfeedCardItem;