import React from 'react';
import Modal from 'react-native-modal';
import {View,Text,Header,Body,Left,Right,Button,Footer,Content,Item,Icon} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Styles from '../../styles/Profile';


const ModalView = (props)=>{

    return (

        <View>
        <Modal isVisible={props.visible}>
          <View style={Styles.modalView}>
            <Header style={Styles.modalHeader}>
                <Body style={Styles.modalHeaderBody}>
                <Text style={Styles.modalHeadText}>{props.title}</Text>
                </Body>
            </Header>
            <Content>
              {!props.media?
                <Item style={Styles.modalItem}>
                  <TouchableOpacity onPress={props.upload.bind(this,'CAMERA')}>
                  <Text style={Styles.itemText}>  <Icon name="camera" style={Styles.itemIcon}></Icon>  Open camera</Text>
                  </TouchableOpacity>
                 </Item>
              :null}
              <Item style={{...Styles.modalItem,...Styles.modalItem2}}>
                  <TouchableOpacity onPress={props.upload}>
                  <Text style={Styles.itemText}><Icon name="images" style={Styles.itemIcon}></Icon>  Open gallery</Text>
                  </TouchableOpacity>
              </Item>
            </Content>
            <Footer style={Styles.modalFooter}>
                <Button danger style={Styles.modalCancel} onPress={props.toggleModal}><Text>Cancel</Text></Button>
            </Footer>
          </View>
        </Modal>
      </View>


    );


}

export default ModalView;