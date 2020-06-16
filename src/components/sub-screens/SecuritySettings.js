import React, {Component} from 'react';
import Styles from '../../styles/Settings';
import {Text,Content,Form,Item,Input,Title,Spinner,View} from 'native-base';

const  SecuritySettings = (props)=>{

    return(
        <Content padder>
           
        <Title style={Styles.securityTitle}>CHANGE PASSWORD</Title>

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
            <Text style={Styles.txt}>Current Password</Text>
            <Item style={Styles.item}>
                <Input placeholder="Current Password" value={props.user.Password} onChangeText={props.setCurrentPassword} secureTextEntry={true}></Input>
            </Item>
            <Text style={Styles.txt}>New Password</Text>
            <Item style={Styles.item}>
                <Input placeholder="New Password" value={props.user.NewPassword} onChangeText={props.setNewPassword} secureTextEntry={true}></Input>
            </Item>
            <Text style={Styles.txt}>Confirm Password</Text>
            <Item style={Styles.item}>
                <Input placeholder="Confirm Password" value={props.user.ConfirmPassword} onChangeText={props.setConfirmPassword} secureTextEntry={true}></Input>
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

export default SecuritySettings;