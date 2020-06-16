import React, { Component } from 'react';
import { Text, Content, Input, Form, Item, Picker,Icon,Spinner,View } from 'native-base';
import { Image } from 'react-native';
import Styles from '../../styles/Settings';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const AccountSettings = (props) => {

    return (
        <Content padder>
            <Image source={props.user.Dp !== undefined ? { uri: `data:image/png;base64,${props.user.Dp}` } : require('../../assets/images/user.jpg')}
                style={Styles.dp}></Image>
                 {props.errors.length!==0?
                <View style={Styles.error}> 
                   {props.errors.map((e,i)=>{
                     
                   return  <Text style={Styles.errorText} key={Math.random() + i}>* {e.error}</Text>

                   })
                   
                   }
                  
                </View>
                : null
                }
            <Form>
                <Text style={Styles.txt}>FirstName</Text>
                <Item style={Styles.item}>
                    <Input placeholder="FirstName" value={props.user.FirstName} onChangeText={props.setFirstName}></Input>
                </Item>
                <Text style={Styles.txt}>LastName</Text>
                <Item style={Styles.item}>
                    <Input placeholder="LastName" value={props.user.LastName} onChangeText={props.setLastName}></Input>
                </Item>
                <Text style={Styles.txt}>Country</Text>
                <Item style={Styles.item}>
                    <Picker
                        mode="dropdown"
                        iosHeader="Country"
                        iosIcon={<Icon name="arrow-down" />}
                        placeholder="Country"
                        onValueChange={props.setCountry}
                        selectedValue={props.user.Country}>
                        {
                            props.countries.map((e, i) => { return <Picker.Item label={e.name} value={e.name} key={"key" + i} /> })
                        }
                    </Picker>
                </Item>
                <Text style={Styles.txt}>City</Text>
                <Item style={Styles.item}>
                    <Input placeholder="City" value={props.user.City} onChangeText={props.setCity}></Input>
                </Item>
                <Text style={Styles.txt}>Phone</Text>
                <Item style={Styles.item}>
                    <Input placeholder="Phone" value={props.user.Phone} onChangeText={props.setPhone}></Input>
                </Item>
                <Text style={Styles.txt}>Birthday</Text>
                <Item onPress={props.showDatePicker} style={Styles.item}>
                <Input value={props.user.Birthday ? moment(props.user.Birthday).format('MMMM Do YYYY') :null} 
                  placeholder="Birthday" disabled={true}></Input>
                    <DateTimePickerModal
                        isVisible={props.isVisible}
                        mode="date"
                        onConfirm={props.handleConfirm}
                        onCancel={props.hideDatePicker}
                        maximumDate={new Date('2010-01-01')
                        }
                    />
                </Item>

            </Form>
            {props.loading?
                <View style={{marginTop:-65}}>
                <Spinner size="large" color="black" style={Styles.spinner}></Spinner>
                </View>
                :null}
                {props.serverError!==undefined?
                <View style={Styles.serverError}>
                 <Text style={Styles.errorText}>{props.serverError}</Text>
                </View>
                :null
                }


        </Content>
    )



}

export default AccountSettings;