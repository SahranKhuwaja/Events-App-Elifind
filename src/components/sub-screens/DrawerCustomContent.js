import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Icon, Thumbnail, Text, view, View } from 'native-base';
import { ImageBackground } from 'react-native';
import styles from '../../styles/DrawerNavigator';
import axios from 'axios';

const DrawerCustomContent = (props) => {

 
  return (
  
    <DrawerContentScrollView {...props}>
      <ImageBackground source={require('../../assets/images/cover4.jpg')} style={styles.img}>
        <Thumbnail source={props.state.routes[0].params.user.Dp!==undefined?{uri:`data:image/png;base64, ${props.state.routes[0].params.user.Dp}`}
        :require('../../assets/images/user.jpg')}
         large style={styles.thumbnail}></Thumbnail>
        <Text style={styles.txt}>{props.state.routes[0].params.user.FirstName.toUpperCase() + ' '}
          {props.state.routes[0].params.user.LastName.toUpperCase()}</Text>
        <View style={styles.view}>
          <Text style={styles.txt2}> {props.state.routes[0].params.user.Email} <Icon name="mail" style={styles.txt2}></Icon></Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.txt2}> 0 events <Icon name="calendar" style={styles.txt2}></Icon> </Text>
        </View>
      </ImageBackground>
      <DrawerItemList {...props} />
      <DrawerItem onPress={props.state.routes[0].params.setStatus} label="Logout" icon={() => <Icon name="sign-out-alt" type="FontAwesome5" style={styles.icon2}></Icon>} style={styles.item}
       />
    </DrawerContentScrollView>
  );
}


export default DrawerCustomContent;
