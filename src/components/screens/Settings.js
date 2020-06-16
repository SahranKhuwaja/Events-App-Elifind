import React, { Component } from 'react';
import Header from '../sub-screens/Header';
import { Text, Container,Button } from 'native-base';
import SettingsBody from '../sub-screens/SettingsBody';
import AccountSettings from '../sub-screens/AccountSettings';
import SecuritySettings from '../sub-screens/SecuritySettings';
import Loading from '../sub-screens/Loading';
import axios from 'axios';
import { Buffer } from 'buffer';
import { data } from '../../countries/country';
import { forOwn,isEqual } from 'lodash';


export default class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      user: {},
      currentSettings: undefined,
      currentTitle: 'Settings',
      edit: false,
      countries: [],
      isVisible: false,
      errors: [],
      serverError: undefined,
      loading: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.setFirstName = this.setFirstName.bind(this);
    this.setLastName = this.setLastName.bind(this);
    this.setCountry = this.setCountry.bind(this);
    this.setCity = this.setCity.bind(this);
    this.setPhone = this.setPhone.bind(this);
    this.showDatePicker = this.showDatePicker.bind(this);
    this.hideDatePicker = this.hideDatePicker.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.setCurrentPassword = this.setCurrentPassword.bind(this);
    this.setNewPassword = this.setNewPassword.bind(this);
    this.setConfirmPassword = this.setConfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this)
  }

  componentDidMount = async () => {
    
    const user = await this.getUserData();
    const countries = await data.map(e => { return { name: e.name } });
    this.setState({
      ready: await true,
      user: await user,
      countries: await countries
    })
  }

  shouldComponentUpdate = async (nextProps, nextState) => {

    return (!isEqual(this.state.user, nextState.user)) || (!isEqual(this.state.ready, nextState.ready))
             || (!isEqual(this.state.loading, nextState.loading)) || (!isEqual(this.state.countries, nextState.countries))
             || (!isEqual(this.state.user,this.props.route.params.user))
             
 
}

  setUserData = async()=>{

    
  }

  getUserData = async () => {
    if (this.props.route.params) {
      return this.props.route.params.user
    } else {
      const data = await axios.get('http://192.168.8.103:3000/User/Profile');
      if (data.data.user.Dp !== undefined) {

        data.data.user.Dp = await Buffer.from(data.data.user.Dp).toString('base64')
      }
      return await data.data.user;
    }
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  setSettings = async (settings, title, cancel) => {
    const { edit } = this.state;
    if(cancel){
      await this.revert()
    }
    this.setState({
      currentSettings: await settings,
      currentTitle: await title,
      edit: await !edit
    })

  }
  
  revert = async()=>{

    const user = await this.getUserData();
    this.setState({
      user:await user,
      errors:[]
    })

  }

  showDatePicker = () => {
    this.setState({
      isVisible: true
    })
  };

  hideDatePicker = () => {
    this.setState({
      isVisible: false
    })
  };
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
  
  setCurrentPassword = async(Password)=>{
     const {user} = this.state;
     this.setState({
       user: await { ...user, Password}
     })
  }

  setNewPassword = async(NewPassword)=>{
    const {user} = this.state;
    this.setState({
      user: await { ...user, NewPassword}
    })
  }

  setConfirmPassword = async(ConfirmPassword)=>{
    const {user} = this.state;
    this.setState({
      user: await { ...user, ConfirmPassword}
    })
  }

  onSubmit = async () => {


    if (await this.validate()) {
      this.submitForm()
    }

  }

  validate = async () => {

    return await this.Check();

  }
  Check = async () => {
    const { user } = this.state;
    let errors = [];

    if(this.state.currentTitle==='Security Info'){
       if(user.Password === undefined){
          errors.push({ error: 'Current Password is required!' })
       }
       if(user.NewPassword === undefined){
        errors.push({ error: 'New Password is required!' })
       }
       if(user.ConfirmPassword === undefined){
        errors.push({ error: 'Confirm Password is required!' })
     }
   
    }
    
    await forOwn(user, (value, key) => {
      if (value === '') {
        if (value !== 'Phone') {
          errors.push({ error: key + ' is required!' })
        }
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
      if (key === 'NewPassword' && value !== '') {
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

  submitForm = async () => {

    this.setLoading()
    const request = await axios.put('http://192.168.8.102:3000/User/Update', {...this.state.user,Dp:undefined});
    await this.setLoading();
    if (request.data===true) {
      alert(request.data)
       await this.updateParams()
       await this.setSettings('Settings','Settings')
    } else {
      this.setState({
        serverError: request.data.error
      })
    }
  }

  setLoading = async () => {
    const { loading } = this.state;
    this.setState({
      serverError: undefined,
      loading: !loading
    })
  }

  updateParams = async()=>{
    
    this.props.navigation.setParams({
      user:await this.state.user
    })
    
   
  }

  onChangePassword = async()=>{
    if (await this.validate()) {
      this.changePassword()
    }
  }

  changePassword = async()=>{
    this.setLoading()
    const request = await axios.put('http://192.168.8.102:3000/User/Update/Password', 
    {Password:this.state.user.Password,NewPassword:this.state.user.NewPassword});
    await this.setLoading();
    if (request.data===true) {
       await this.setSettings('Settings','Settings')
    } else {
      alert('yes')
      this.setState({
        serverError: request.data.error
      })
    }
  }


  render() {
    if (this.state.ready) {
      return (
        <Container>
          <Header toggle={this.toggleDrawer} title={this.state.currentTitle} edit={this.state.edit}
            setSettings={this.setSettings} onSubmit={this.onSubmit} onChangePassword={this.onChangePassword} />

          {this.state.currentSettings === 'Account' ?
            <AccountSettings user={this.state.user} countries={this.state.countries} setFirstName={this.setFirstName}
              setLastName={this.setLastName} setCountry={this.setCountry} setCity={this.setCity}
              setPhone={this.setPhone} showDatePicker={this.showDatePicker}
              hideDatePicker={this.hideDatePicker} isVisible={this.state.isVisible} handleConfirm={this.handleConfirm}
              errors={this.state.errors} serverError={this.state.serverError}
              loading={this.state.loading}/>
            :
            this.state.currentSettings === 'Security' ?

              <SecuritySettings setCurrentPassword={this.setCurrentPassword}
              setNewPassword={this.setNewPassword} setConfirmPassword={this.setConfirmPassword} user={this.state.user}
              errors={this.state.errors} serverError={this.state.serverError}
              loading={this.state.loading} />
              :

              <SettingsBody setSettings={this.setSettings} />
          }
        </Container>
      )
    } else {
      return <Loading />
    }
  }
}