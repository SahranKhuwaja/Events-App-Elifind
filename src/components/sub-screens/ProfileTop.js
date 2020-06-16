import React from 'react';
import { ImageBackground, Image} from 'react-native';
import { Icon } from 'native-base';
import Styles from '../../styles/Profile';

const ProfileTop = (props) => {
 
  return (
  
    <ImageBackground source={require('../../assets/images/cover8.jpg')}
      style={Styles.cover}>
      <Image source={props.dp!==undefined?{uri:`data:image/png;base64, ${props.dp}`}:require('../../assets/images/user.jpg')}
        style={Styles.dp} />
        <Icon name="camera" style={Styles.upload} onPress={props.uploadDp}></Icon>

    </ImageBackground>

  );


}

export default ProfileTop;