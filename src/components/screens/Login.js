import React, { Component } from 'react';
import Form from '../sub-screens/LoginForm';
import {isEqual} from 'lodash';
import axios from 'axios';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            user:{},
            loading:false,
            serverError:undefined
        }
        
        this.navigateToTheRegistrationScreen = this.navigateToTheRegistrationScreen.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    shouldComponentUpdate = async (nextProps, nextState) => {
      
        return (!isEqual(this.state.user, nextState.user))
        
    
      }

    navigateToTheRegistrationScreen(){

        this.props.navigation.navigate('REGISTRATION');
        
    }

    setEmail = async(Email)=>{
        const {user} = this.state;
        this.setState({
            user:{...user,Email}
        })
    }

    setPassword = async(Password)=>{
        const {user} = this.state;
        this.setState({
            user:{...user,Password}
        })
    }

    onSubmit = async()=>{
        if(this.state.user.Email !== undefined && this.state.user.Password!== undefined){
            this.submitForm();
        }
    }
    
    submitForm = async()=>{
        this.setLoading();
        const request = await axios.post('http://192.168.8.101:3000/User/Login',this.state.user);
        await this.setLoading();
        if(request.data.user !==undefined){
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
        return (
        
            <Form navigate={this.navigateToTheRegistrationScreen} loading={this.state.loading}
                setEmail = {this.setEmail} setPassword = {this.setPassword}  onSubmit = {this.onSubmit} serverError={this.state.serverError}/>
    
        );
    }
}