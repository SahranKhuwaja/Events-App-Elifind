import React from 'react';
import { TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { View, Text, Spinner,Icon } from 'native-base';
import styles from '../../styles/Login';

export default function LoginForm(props) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/bg2.png')} style={styles.bg}>
        <View style={styles.view}>
          <Image source={require('../../../assets/logo_2.png')} style={styles.image}></Image>
        </View>
        <View style={styles.input}>
          <Icon name="mail" style={styles.inputIcon}></Icon>
          <TextInput style={styles.inputText} placeholder="Email" onChangeText={props.setEmail} />
        </View>
        <View style={styles.input}>
          <Icon name="lock" type="FontAwesome5" style={styles.inputIcon}></Icon>
          <TextInput style={styles.inputText} placeholder="Password" secureTextEntry={true} onChangeText={props.setPassword} />
        </View>
        <View>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </View>
        <View style={styles.view}>
          <TouchableOpacity style={styles.btn} onPress={props.onSubmit}>
            <Text style={styles.txt}> LOGIN </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupView}>
          <Text style={styles.signupLabel}>
            Don't have an account? <Text style={styles.signupA} onPress={props.navigate}>Signup</Text>
          </Text>
        </View>
        {props.loading ?
          <View style={{ marginTop: -65 }}>
            <Spinner size="large" color="white" style={styles.spinner}></Spinner>
          </View>
          : null}
        {props.serverError !== undefined ?
          <View style={styles.serverError}>
            <Text style={styles.errorText}>{props.serverError}</Text>
          </View>
          : null
        }
      </ImageBackground>
    </View>


  );
}