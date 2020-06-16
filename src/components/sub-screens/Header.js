import React from 'react';
import { Header, Title, Left, Icon, Right, Button, Body } from 'native-base';
import Styles from '../../styles/Header'

const ProfileHeader = (props) => {

    return (

        <Header style={Styles.header}>
            <Left>
                {
                    props.edit ?
                        <Button
                            transparent
                            onPress={props.setSettings.bind(this, 'Settings', 'Settings', true)}>
                            <Icon name="close" style={Styles.headerIcon} />
                        </Button>

                        :
                        props.create ?
                            <Button
                                transparent
                                onPress={props.setSettings.bind(this, 'Events', 'Events', true)}>
                                <Icon name="chevron-left" type="FontAwesome5" style={Styles.headerIcon} />
                            </Button>
                            :
                            <Button
                                transparent
                                onPress={props.toggle}>
                                <Icon name="menu" style={Styles.headerIcon} type="Ionicons" />
                            </Button>
                }
            </Left>
            <Body style={props.edit ? { ...Styles.headerBody, marginLeft: 100 }
                : { ...Styles.headerBody }}>
                <Title style={Styles.headerTitle}>{props.title}</Title>
            </Body>
            <Right>
                {props.edit ?
                    <Button
                        transparent
                        onPress={props.title === 'Update Info' ? props.onSubmit : props.onChangePassword}>
                        <Icon name="checkmark" style={Styles.headerIcon} />
                    </Button>

                    :
                    null
                }
            </Right>
        </Header>
    );
}

export default ProfileHeader;