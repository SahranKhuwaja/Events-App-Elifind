import React, { Component } from 'react'
import Form from '../sub-screens/RegistrationForm';
import { data } from '../../countries/country';
import { ScrollView, ActivityIndicator, Text } from 'react-native';
import { isEqual, forOwn } from 'lodash';
import * as Font from 'expo-font'
import axios from 'axios';
import validator from 'validator';


export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      countries: [],
      user: {
        FirstName: '', LastName: '', Country: 'Afghanistan', City: '', Birthday: '',
        Email: '', Password: '', ConfirmPassword: '', Gender: 'Male'
      },
      male: true,
      female: false,
      errors: [],
      loading:false,
      serverError:undefined
    }

    this.setFirstName = this.setFirstName.bind(this);
    this.setLastName = this.setLastName.bind(this);
    this.setCountry = this.setCountry.bind(this);
    this.setCity = this.setCity.bind(this);
    this.showDatePicker = this.showDatePicker.bind(this);
    this.hideDatePicker = this.hideDatePicker.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.setPhone = this.setPhone.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setConfirmPassword = this.setConfirmPassword.bind(this);
    this.setGender = this.setGender.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }
  componentDidMount = async () => {

    await this.loadFonts();
    const countries = await data.map(e => { return { name: e.name } });
    await this.setState({
      ready: true,
      countries: await countries,
      isVisibility: false,
    })

  }

  shouldComponentUpdate = async (nextProps, nextState) => {
      
    return (!isEqual(this.state.countries, nextState.countries) || !isEqual(this.state.isVisibility, nextState.isVisibility)
      || !isEqual(this.state.user, nextState.user) || !isEqual(this.state.errors, nextState.errors) ||
      !isEqual(this.state.serverError, nextState.serverError));

  }

  loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    
    });
  }

  setFirstName = async (FirstName) => {
    const { user } = this.state
    this.setState({
      user: await { ...user, FirstName }
    })
  }

  setLastName = async (LastName) => {
    const { user } = this.state
    this.setState({
      user: await { ...user, LastName }
    })
  }

  setCountry = async (Country) => {
    const { user } = this.state
    this.setState({
      user: await { ...user, Country }
    })
  }

  setCity = async (City) => {
    const { user } = this.state
    this.setState({
      user: await { ...user, City }
    })
  }

  showDatePicker = () => {
    this.setState({
      isVisibility: true
    })
  };

  hideDatePicker = () => {
    this.setState({
      isVisibility: false
    })
  };

  handleConfirm = (Birthday) => {

    this.hideDatePicker();
    const { user } = this.state;
    this.setState({
      user: { ...user, Birthday }
    })
  };


  setPhone = async (Phone) => {
    const { user } = this.state
    this.setState({
      user: await { ...user, Phone }
    })

  }

  setEmail = async (Email) => {
    const { user } = this.state
    this.setState({
      user: await { ...user, Email }
    })
  }

  setPassword = async (Password) => {
    const { user } = this.state
    this.setState({
      user: await { ...user, Password }
    })
  }

  setConfirmPassword = async (ConfirmPassword) => {
    const { user } = this.state
      this.setState({
        user: await { ...user, ConfirmPassword }
      })
    
  }

  setGender = async (Gender) => {
    const { user } = this.state
    this.setState({
      user: await { ...user, Gender },
      male: Gender === 'Male',
      female: Gender === 'Female'
    })
  }


  onSubmit = async () => {
     
   
    if(await this.validate()){
      this.submitForm()
    }

  }

  validate = async () => {
   
    return await this.Check();

  }
  Check = async () => {
    const { user } = this.state;
    let errors = [];

    await forOwn(user, (value, key) => {
      if (value === '') {
        errors.push({ error: key + ' is required!' })
      }

      if (key === 'FirstName' && value !== '') {
        if (value.length <= 3) {
          errors.push({ error: key + ' must have atleast 4 letters!' })
        }
      }
      if (key === 'LastName' && value !== '') {
        if (value.length <= 3) {
          errors.push({ error: key + ' must have atleast 4 letters!' })
        }
      }
      if (key === 'Phone') {

        if (value.length < 11 || !value.match(/^[0-9]*$|^\+[0-9]*$/)) {
          errors.push({ error: 'Please provide valid phone number!' })
        }
      }
      if (key === 'Email' && value !== '') {
        if (!validator.isEmail(value)) {
          errors.push({ error: 'Please provide valid email address!' })
        }
      }
      if (key === 'Password' && value !== '') {
        if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
          errors.push({ error: key + ' should have 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character!' })
        }
        else{
          if (!isEqual(value,user.ConfirmPassword)) {
            errors.push({error: 'Password doesn\'t match!'})
         }
        }
      }
      
    })
    this.setState({
      errors
    })
    if (errors.length !== 0) {
     
      return false;
    }
    return true;

  }

  submitForm = async()=>{
    
    this.setLoading()
    const request = await axios.post('http://192.168.8.100:3000/User/Signup',this.state.user);
    await this.setLoading();
    if(request.data.user){
      this.props.navigation.navigate('DRAWERCONTAINER',{user:request.data.user});
    }else{
      this.setState({
        serverError:request.data.error
      })
    }
  }
  
  setLoading = async()=>{
    const {loading} = this.state;
    this.setState({
      serverError:undefined,
      loading:!loading
   })
  }


  render() {
    if (this.state.ready) {
      return (
        <ScrollView>
          <Form countries={this.state.countries.length !== 0 ? this.state.countries : [{ name: 'Loading...' }]}
            showDatePicker={this.showDatePicker} hideDatePicker={this.hideDatePicker} isVisibility={this.state.isVisibility}
            handleConfirm={this.handleConfirm} user={this.state.user} setFirstName={this.setFirstName}
            setLastName={this.setLastName} setCountry={this.setCountry} setCity={this.setCity}
            setEmail={this.setEmail} setPassword={this.setPassword} setConfirmPassword={this.setConfirmPassword}
            setGender={this.setGender} setPhone={this.setPhone} onSubmit={this.onSubmit}
            male={this.state.male} female={this.state.female} errors={this.state.errors} loading={this.state.loading}
            serverError={this.state.serverError}/>
           

        </ScrollView>

      );
    } else {
      return (
        <ActivityIndicator size="large"></ActivityIndicator>
      );
    }
  }
}