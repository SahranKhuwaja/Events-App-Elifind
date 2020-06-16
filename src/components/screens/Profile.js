import React, { Component } from 'react';
import { isEqual } from 'lodash';
import axios from 'axios';
import Header from '../sub-screens/Header';
import Loading from '../sub-screens/Loading';
import { Container, View, Content, Footer, Button,Text } from 'native-base';
import { ScrollView } from 'react-native';
import LoadFonts from '../sub-screens/LoadFonts';
import ProfileTop from '../sub-screens/ProfileTop';
import ProfileBody from '../sub-screens/ProfileBody';
import Modal from '../sub-screens/Modal';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Buffer } from 'buffer';

// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
// GLOBAL.FormData = GLOBAL.originalFormData || GLOBAL.FormData;

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            user: {},
            visible: false,
            uri: undefined
        }
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.uploadDp = this.uploadDp.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.upload = this.upload.bind(this);

    }

    shouldComponentUpdate = async (nextProps, nextState) => {

        return (!isEqual(this.state.user, nextState.user)) || (!isEqual(this.state.uri, nextState.uri))
               ||(!isEqual(this.state.user,this.props.route.params.user))


    }


    componentDidMount = async () => {

        await LoadFonts();
        const user = await this.getUserData();
        this.setState({
            ready: await true,
            user: await user
        })
    }

    toggleDrawer = () => {
        this.props.navigation.toggleDrawer();
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

    uploadDp = async () => {

        await this.toggleModal();

    }

    upload = async (action) => {
        let status;
        if (action === 'CAMERA') {
            status = await this.grantPermissionForCamera();
        } else {
            status = await this.grantPermissionForCameraRoll();
        }

        if (status !== 'granted') {
            return alert('Sorry, we need camera roll permissions to make this work!');
        }
        if (action === 'CAMERA') {
            await this.clickImage();
        } else {
            await this.pickImage();
        }
    }

    toggleModal = async () => {

        const { visible } = this.state;
        this.setState({
            visible: await !visible
        })
    }
    grantPermissionForCamera = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        return status;
    }
    grantPermissionForCameraRoll = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        return status;
    }
    clickImage = async () => {

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.cancelled) {
            const dp = await this.saveDp(result)
            await this.setDp(Buffer.from(dp.Dp).toString('base64'))
        }

    }

    pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.cancelled) {
            this.toggleModal();
            const dp = await this.saveDp(result)
            await this.setDp(Buffer.from(dp.Dp).toString('base64'))
        }

    }

    saveDp = async (result) => {

        const uriParts = result.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const data = new FormData();
        await data.append('dp', {
            uri: result.uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`
        });

        const request = await axios.post('http://192.168.8.100:3000/User/Upload/Dp', data, {

            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }

        })
        return request.data;
    }

    setDp = async (base64) => {
        const { user } = this.state
        this.setState({
            user: await { ...user, Dp: base64 }
        })

        this.props.navigation.setParams({
            user: await this.state.user
        })
    }

    render() {
       
        if (this.state.ready) {
            return (


                <Container>
                    <Header toggle={this.toggleDrawer} title='Profile' />
               
                    <ProfileTop uploadDp={this.uploadDp} dp={this.state.user.Dp} />
                
                    <ProfileBody user={this.state.user} />
               
                    <Modal visible={this.state.visible} toggleModal={this.toggleModal} upload={this.upload} />

                </Container>


            )
        } else {
            return <Loading />
        }
    }
}