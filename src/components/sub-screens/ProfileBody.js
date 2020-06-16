import React from 'react';
import { View, Text, Icon, Card, CardItem, Body, Content, Item } from 'native-base';
import styles from '../../styles/Profile';
import moment from 'moment';
const ProfileBody = (props) => {

    return (

        <View style={styles.content}>

            <Text style={styles.name}>{props.user.FirstName.toUpperCase() + " "}
                {props.user.LastName.toUpperCase()}
            </Text>
            <View style={styles.view}>
                <Icon name="mail" style={styles.headIcon}></Icon>
                <Text style={styles.headDetails}>
                    {props.user.Email}
                </Text>
            </View>
            <Card style={styles.card}>
                <CardItem style={styles.cardItem} header>
                    <Icon name="home" style={styles.body}></Icon>
                    <Text style={styles.body}>Lives in {props.user.City + ", "} {props.user.Country}</Text>
                </CardItem>
                <CardItem style={styles.cardItem}>
                    <Icon name="person" style={styles.body}></Icon>
                    <Text style={styles.body}>{props.user.Gender + ', '} {Math.floor(moment().diff(props.user.Birthday, 'years')) + ' years old'}</Text>
                </CardItem>
                <CardItem style={styles.cardItem}>
                    <Icon name="calendar" style={styles.body}></Icon>
                    <Text style={styles.body}>Birthday on {moment(props.user.Birthday).format('MMMM Do YYYY')}</Text>
                </CardItem>
                {props.user.Phone !== undefined ?
                    <CardItem style={styles.cardItem}>
                        <Icon name="call" style={styles.body}></Icon>
                        <Text style={styles.body}>{props.user.Phone}</Text>
                    </CardItem>
                    : null}
                <CardItem style={styles.cardItem}>
                    <Icon name="mail" style={styles.body}></Icon>
                    <Text style={styles.body}>{props.user.Email}</Text>
                </CardItem>
                <CardItem style={styles.cardItem} footer>
                    <Icon name="calendar" style={styles.body}></Icon>
                    <Text style={styles.body}>Joined on {moment(props.user.createdAt).fromNow()}</Text>
                </CardItem>
            </Card>
        </View>

    );


}

export default ProfileBody;