import React from 'react';
import { TextInput, ImageBackground, Image} from 'react-native';
import { Picker, Icon, Item, Left, Right, Radio, View, Text, Body, Button,Spinner } from 'native-base';
import styles from '../../styles/Registration';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function RegistrationForm(props) {
   
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/bg2.png')} style={styles.bg}>
                <View>
                    <Image source={require('../../../assets/logo_2.png')} style={styles.image}></Image>
                </View>
                <View style={styles.headView}>
                    <Text style={styles.heading}>REGISTRATION</Text>
                </View>
                {props.errors.length!==0?
                <View style={styles.error}> 
                   {props.errors.map((e,i)=>{
                     
                   return  <Text style={styles.errorText} key={Math.random() + i}>* {e.error}</Text>

                   })
                   
                   }
                  
                </View>
                : null
                }
                <View style={styles.input}>
                    <Icon name="person" style={styles.inputIcon}></Icon>
                    <TextInput style={styles.inputText} placeholder='First Name' value={props.user.FirstName}
                      onChangeText={props.setFirstName}></TextInput>
                </View>
                <View style={styles.input}>
                    <Icon name="person" style={styles.inputIcon}></Icon>
                    <TextInput style={styles.inputText} placeholder='Last Name' value={props.user.LastName}
                        onChangeText={props.setLastName}></TextInput>
                </View>

                <View>
                    <Item picker style={{ ...styles.input, ...styles.picker }} regular>
                        <Icon name="globe-asia" type="FontAwesome5" style={styles.inputIconC}></Icon>
                        <Picker
                            mode="dropdown"
                            iosHeader="Country"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Country"
                            selectedValue={props.user.Country}
                            onValueChange={props.setCountry}>
                            {
                                props.countries.map((e, i) => { return <Picker.Item label={e.name} value={e.name} key={"key" + i} /> })
                            }
                        </Picker>
                    </Item>

                </View>
                <View style={styles.input}>
                    <Icon name="city" type="FontAwesome5" style={{ ...styles.inputIcon, paddingRight: 6 }}></Icon>
                    <TextInput style={styles.inputText} placeholder="City" value={props.user.City}
                        onChangeText={props.setCity}></TextInput>
                </View>

                <View style={styles.input} onTouchStart={props.showDatePicker}>
                    <Icon name="calendar-alt" type="FontAwesome5" style={styles.inputIcon}></Icon>
                    <Text style={styles.calenderText}>{props.user.Birthday ? props.user.Birthday.toDateString() : "Select Date of Birth"}</Text>
                    <DateTimePickerModal
                        isVisible={props.isVisibility}
                        mode="date"
                        onConfirm={props.handleConfirm}
                        onCancel={props.hideDatePicker}
                        maximumDate={new Date('2010-01-01')}
                    />

                </View>
                <View style={styles.input}>
                    <Icon name="call"  style={styles.inputIcon}></Icon>
                    <TextInput style={styles.inputText} placeholder="Phone  --Optional" value={props.user.Phone}
                       keyboardType="numeric" maxLength={13} onChangeText={props.setPhone}></TextInput>
                </View>

                <View style={styles.input}>
                    <Icon name="mail" style={styles.inputIcon}></Icon>
                    <TextInput style={styles.inputText} placeholder="Email" value={props.user.Email}
                    keyboardType="email-address"
                        onChangeText={props.setEmail}></TextInput>
                </View>
                <View style={styles.input}>
                    <Icon name="lock" type="FontAwesome5" style={styles.inputIcon}></Icon>
                    <TextInput style={styles.inputText} placeholder="Password" secureTextEntry={true}
                        value={props.user.Password} onChangeText={props.setPassword}></TextInput>
                </View>
                <View style={styles.input}>
                    <Icon name="lock" type="FontAwesome5" style={styles.inputIcon}></Icon>
                    <TextInput style={styles.inputText} placeholder="Confirm Password" secureTextEntry={true}
                        value={props.user.Cpassword} onChangeText={props.setConfirmPassword}></TextInput>
                </View>
                <View style={styles.radio}>

                    
                    <Left style={styles.radioLeft}>
                        <Text style={styles.radioText}>I am </Text>
                        <Radio selected={props.male} color='darkblue' selectedColor='darkblue' onPress={()=>{props.setGender('Male')}}/>
                        <Text style={styles.radioText}>Male</Text>
                        <Radio selected={props.female} color='darkblue' selectedColor='darkblue' onPress={()=>{props.setGender('Female')}}/>
                        <Text style={styles.radioText}>Female</Text>
                    </Left>
                    <Body />
                    <Right />
                </View>
                <View style={styles.buttomView}>
                      <Button primary rounded style={styles.btn} onPress={props.onSubmit}><Text>SIGN UP</Text></Button>
                </View>
                {props.loading?
                <View style={{marginTop:-65}}>
                <Spinner size="large" color="white" style={styles.spinner}></Spinner>
                </View>
                :null}
                {props.serverError!==undefined?
                <View style={styles.serverError}>
                 <Text style={styles.errorText}>{props.serverError}</Text>
                </View>
                :null
                }
            </ImageBackground >
        </View >


    );
}