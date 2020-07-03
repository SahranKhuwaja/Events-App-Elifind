import React from 'react';
import {View,Image} from 'react-native';
import Modal from 'react-native-modal';

const ImageViewer = (props)=>{

    return (
        <View>
        <Modal isVisible={props.visible} onBackdropPress={props.cancelImage}>
          <View>

            <Image style={{ height: 400 }} source={{ uri: props.uri }}>

            </Image>
          </View>
        </Modal>
      </View>
    )

}

export default ImageViewer;