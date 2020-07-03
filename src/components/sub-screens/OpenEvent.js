import React from 'react';
import { Content, Text, Thumbnail, Icon, Tabs, Tab,TabHeading, ScrollableTab, Button } from 'native-base';
import { Image, View } from 'react-native';
import DetailsTab from './DetailsTab';
import MediaTab from './MediaTab';
import PostsTab from './PostsTab';
import RatingTab from './RatingTab';
import ReviewTab from './ReviewTab';
import Styles from '../../styles/Events';
import moment from 'moment';

const OpenEvent = (props) => {

    return (
        <Content>
            <Image source={require('../../assets/images/event-bg.png')} style={Styles.eventImage}></Image>
            <Text style={Styles.eventTitle}>{props.data.Name.toUpperCase()}</Text>
            <View style={Styles.eventView}>
                <View style={Styles.eventDp}>
                    <Thumbnail source={require('../../assets/images/event-logo.png')} square large style={Styles.imageEvent}></Thumbnail>
                </View>
                <View style={Styles.view2}>
                    <View style={Styles.view3}>
                        <Icon name="calendar" style={Styles.icon2}></Icon>
                        <View style={Styles.view4}>
                            <Text>{moment(props.data.Date).format('ddd, MMM D YYYY')}</Text>
                            <Text note>{props.data.ScheduleAt}</Text>
                        </View>
                    </View>
                    <View style={Styles.view3}>
                        <Icon name="map-marker-alt" type="FontAwesome5" style={Styles.icon2}></Icon>
                        <View style={Styles.view4}>
                            <Text>{props.data.Location}</Text>
                            {props.data.Type === 'Virtual' ?<Text note>(online) from </Text>:null}
                            <Text note>{props.data.City}</Text>
                            <Text note>{props.data.Country}</Text>
                        </View>
                    </View>
                    <View>
                    {!props.isOwner ?
                        props.data.Joined?
                        <Button iconLeft transparent disabled style={Styles.joined}>
                            <Icon name="checkmark"></Icon>
                            <Text>Joined</Text>
                        </Button>
                        :
                        <Button iconLeft transparent onPress={props.join}>
                            <Text>Join</Text>
                        </Button>
                    : null}
                    </View>
                   
                </View>
            </View>
            <Tabs renderTabBar={() => <ScrollableTab />} style={Styles.tabSection}>
                <Tab heading={<TabHeading><Icon name="info-circle" type="FontAwesome5" /><Text>Details</Text></TabHeading>}>
                    <DetailsTab details={props.data.Description} category={props.data.Category}
                        type={props.data.Type}/>
                </Tab>
                <Tab heading={<TabHeading><Icon name="images" style={Styles.tabIcon} /><Text>Media</Text></TabHeading>}>
                    <MediaTab isOwner={props.isOwner} uploadMedia={props.uploadMedia} upload={props.upload} toggleModal={props.toggleModal} 
                     visible={props.visible} images={props.images} renderImage={props.renderImage}/>
                </Tab>
                <Tab heading={<TabHeading><Icon name="edit" type="FontAwesome5"/><Text>Posts</Text></TabHeading>}>
                    <PostsTab isOwner={props.isOwner} publish={props.publish} setPost={props.setPost} posts={props.posts} 
                    post={props.post} renderItem={props.renderItem}/>
                </Tab>
                <Tab heading={<TabHeading><Icon name="star-half-alt" type="FontAwesome5"/><Text>Ratings</Text></TabHeading>}>
                    <RatingTab total={props.total} average={props.average} myRating={props.myRating} rate={props.rate}/>
                </Tab>
                <Tab heading={<TabHeading><Icon name="smile" type="FontAwesome5"/><Text>Reviews</Text></TabHeading>}>
                    <ReviewTab data={props.data} myRating={props.myRating} setReview={props.setReview} review={props.review}
                    reviewText={props.reviewText} reviews={props.reviews} renderReviews={props.renderReviews}/>
                </Tab>
               
               
            </Tabs>

        </Content>
    )
}

export default OpenEvent;