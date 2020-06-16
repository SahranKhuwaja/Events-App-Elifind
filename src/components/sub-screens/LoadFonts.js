import React from 'react';
import * as Font from 'expo-font';

const LoadFonts = async()=>{
    await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      });
}

export default LoadFonts;