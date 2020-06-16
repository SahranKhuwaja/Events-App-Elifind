import React from 'react';
import { Content, Text, Icon, Card, CardItem, Right, Left } from 'native-base';
import {TouchableOpacity} from 'react-native';
import Styles from '../../styles/Settings';

const SettingsBody = (props) => {

  return (

    <Content padder>

      <Card>
        <TouchableOpacity onPress={props.setSettings.bind(this,'Account','Update Info')}>
        <CardItem style={Styles.cardItem} bordered>
          <Left>
            <Icon name='user-cog' type='FontAwesome5'></Icon>
            <Text style={Styles.cardText}>Account settings</Text>
          </Left>
          <Right>
            <Icon name='chevron-right' type='FontAwesome5'></Icon>
          </Right>
        </CardItem>
        </TouchableOpacity>
        <TouchableOpacity  onPress={props.setSettings.bind(this,'Security','Security Info')}>
        <CardItem style={Styles.cardItem}>
          <Left>
            <Icon name="cogs" type="FontAwesome5"></Icon>
            <Text style={Styles.cardText}>Security settings</Text>
          </Left>
          <Right>
            <Icon name='chevron-right' type='FontAwesome5'></Icon>
          </Right>
        </CardItem>
        </TouchableOpacity>
      </Card>
   

    </Content>


  );


}

export default SettingsBody;
