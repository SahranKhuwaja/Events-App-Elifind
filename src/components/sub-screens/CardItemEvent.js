import React from 'react';
import { Text, Left, Right, Body, Button, Thumbnail, Card, CardItem, Icon } from 'native-base';
import { Image } from 'react-native';
import moment from 'moment';

const CardItemEvent = (props) => {

  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail source={require('../../assets/images/logo.png')} />
          <Body>
            <Text>{props.item.Name}</Text>
            <Text note>{props.item.Category}</Text>
            <Text note>At {props.item.ScheduleAt} on {moment(props.item.Date).format('LL')}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image source={require('../../assets/images/event-bg.png')} style={{ height: 200, width: null, flex: 1 }} />
      </CardItem>
      <CardItem>
        <Left>
          <Text note>{moment(props.item.createdAt).fromNow()}</Text>
        </Left>
        <Body />
        <Right>
           <Button transparent>
             <Text>Open</Text>
             <Icon name="chevron-right" type="FontAwesome5"></Icon>
           </Button>
        </Right>
      </CardItem>
    </Card>
  )
}

export default CardItemEvent;