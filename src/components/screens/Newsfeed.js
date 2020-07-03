import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../sub-screens/Loading';
import { TouchableOpacity, Image } from 'react-native';
import { Container, Text, Button } from 'native-base';
import NewsfeedHeader from '../sub-screens/NewsfeedHeader';
import Header from '../sub-screens/Header';
import NewsfeedBody from '../sub-screens/NewsfeedBody';
import NewsfeedCardItem from '../sub-screens/NewsfeedCardItem';
import { isEqual } from 'lodash';
import OpenEvent from '../sub-screens/OpenEvent';
import PostCardItem from '../sub-screens/PostCardItem';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ImageViewer from '../sub-screens/ImageModal';
import ReviewCardItem from '../sub-screens/ReviewCardItem';
import Styles from '../../styles/Events';
import { Buffer } from 'buffer';


export default class Newsfeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            events: [],
            loading: true,
            filter: [],
            found: true,
            currentSettings: '',
            currentTitle: '',
            images: [],
            posts: [],
            uri: '',
            back: false,
            open: {},
            post: "",
            visible: false,
            imageVisible: false,
            average: 0,
            total: 0,
            myRating: 0,
            review: '',
            reviews:[]
        }
        this.renderItem = this.renderItem.bind(this);
        this.search = this.search.bind(this);
        this.open = this.open.bind(this);
        this.setPost = this.setPost.bind(this);
        this.post = this.post.bind(this);
        this.renderItemPost = this.renderItemPost.bind(this);
        this.uploadMedia = this.uploadMedia.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.upload = this.upload.bind(this);
        this.renderImage = this.renderImage.bind(this);
        this.cancelImage = this.cancelImage.bind(this);
        this.rate = this.rate.bind(this);
        this.setReview = this.setReview.bind(this);
        this.review = this.review.bind(this);
        this.renderReviews = this.renderReviews.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount = async () => {

        this.fetchData();

    }

    fetchData = async ()=>{
        const events = await this.fetchEvents();
        const user = await this.fetchUserData();
        if (events !== undefined) {
            this.setState({
                events,
                user,
                loading: false,
                update: false
            })
        }
    }

    // shouldComponentUpdate = (nextProps, nextState) => {

    //     return (!isEqual(this.state.events, nextState.events) || !isEqual(this.state.filter, nextState.filter)
    //         || !isEqual(this.state.update, nextState.update))


    // }

    refresh = ()=>{
        this.setState({
            loading:true
        })
        this.fetchData()
    }

    fetchEvents = async () => {

        const request = await axios.get('https://events-app-elifind.herokuapp.com/Event/Get/All');
        return request.data.reverse()

    }

    fetchUserData = async () => {
        const request = await axios.get('https://events-app-elifind.herokuapp.com/User/Profile');
        if (request.data.user.Dp !== undefined) {

            request.data.user.Dp = await Buffer.from(request.data.user.Dp).toString('base64')
        }
        return await request.data.user;
    }

    renderItem = ({ item }) => (

        <NewsfeedCardItem item={item} key={Math.random() + item._id} join={this.join.bind(this, item._id)}
            open={this.open.bind(this)} />
    )

    search = async (tag) => {
        const { events } = this.state;
        let data = await events.filter(e => {
            return (e.FirstName.toLowerCase().includes(tag.toLowerCase())) ||
                (e.LastName.toLowerCase().includes(tag.toLowerCase())) || (e.Name.toLowerCase().includes(tag.toLowerCase()))
        })
        if (data.length !== 0) {
            this.setState({
                filter: await data,
            })
        } else {
            this.setState({
                found: false,
                filter: []
            })
        }
    }

    join = async (EventID) => {

        const request = await axios.post('https://events-app-elifind.herokuapp.com/Participant/Join', { EventID });
        if (request.data === true) {
            const { events, update } = this.state;
            const Events = await Promise.all(events.map(async e => {
                if (e._id.toString() === EventID.toString()) {
                    e.Participants += 1;
                    e.Joined = true
                }
                return await e
            }))
            this.setState({
                events: Events,
                update: !update
            })
        }
    }

    open = async (_id) => {
        const open = await this.state.events.filter(e => e._id === _id);
        const images = await this.getImages(open[0]._id);
        const posts = await this.getPosts(open[0]._id);
        const { average, total } = await this.getRatings(open[0]._id);
        const myRating = await this.getMyRating(open[0]._id);
        const reviews = await this.getReviews(open[0]._id);
        this.setState({
            open: open[0],
            currentSettings: 'OpenEvent',
            currentTitle: open[0].Name,
            back: true,
            images,
            posts,
            average,
            total,
            myRating

        })

    }

    getImages = async (EventID) => {
        const request = await axios.get('https://events-app-elifind.herokuapp.com/Image/Images/Get', { params: { EventID } });
        return request.data;
    }

    getPosts = async (id) => {
        const request = await axios.get('https://events-app-elifind.herokuapp.com/Post/Get', { params: { id } });
        return request.data
    }

    getRatings = async (id) => {
        const ratings = await axios.get('https://events-app-elifind.herokuapp.com/Rating/Ratings/Get', { params: { id } });
        return ratings.data;
      }
    
    getMyRating = async (id) => {
        const myRating = await axios.get('https://events-app-elifind.herokuapp.com/Rating/MyRating', { params: { id } });
        return myRating.data.rating;
    }

    getReviews = async (id) => {
        const reviews = await axios.get('https://events-app-elifind.herokuapp.com/Review/Reviews/Get',{ params: { id } });
        return reviews.data;
      }

    setPost = async (post) => {
        this.setState({
            post
        })
    }

    post = async () => {
        const { posts, open, post } = this.state;
        if (post !== '') {
            const request = await axios.post('https://events-app-elifind.herokuapp.com/Post/Publish', { Event: open._id, Post: post });
            if (request.data !== undefined) {
                this.setState({
                    posts: [request.data, ...posts],
                    post: ''
                })
            }
        }
    }


    renderItemPost = ({ item }) => (

        <PostCardItem item={item} key={Math.random() + item._id} user={this.state.user} />
    )



    upload = async (action) => {
        let status;
        status = await this.grantPermissionForCameraRoll();
        if (status !== 'granted') {
            return alert('Sorry, we need camera roll permissions to make this work!');
        }

        await this.pickImage();

    }

    uploadMedia = async () => {
        await this.toggleModal();
    }

    toggleModal = async () => {

        const { visible } = this.state;
        this.setState({
            visible: await !visible
        })
    }

    grantPermissionForCameraRoll = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        return status;
    }


    pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1
        });
        if (!result.cancelled) {
            this.toggleModal();
            const image = await this.saveMedia(result)
            if (image.error) {
                alert(image)
            } else {
                this.setImageToState(image);
            }
            // await this.setDp(Buffer.from(dp.Dp).toString('base64'))
        }

    }

    saveMedia = async (image) => {

        const uriParts = image.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const data = new FormData();
        await data.append('media', {
            uri: image.uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });
        await data.append('eventID', this.state.open._id)

        const request = await axios.post('https://events-app-elifind.herokuapp.com/Event/Image/Upload', data, {

            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }

        })
        return request.data;


    }

    setImageToState = async (image) => {
        const { images } = this.state;
        this.setState({
            images: [...await image, ...await images]
        })
    }
    renderImage = ({ item }) => (

        <TouchableOpacity style={Styles.imageView} onPress={this.viewImage.bind(this, item)}>
            <Image source={{ uri: `https://events-app-elifind.herokuapp.com/Image/${item.ImageID}/${item.FileName}` }}
                style={Styles.image2} />
        </TouchableOpacity>


    )

    viewImage = async (item) => {

        this.setState({
            imageVisible: true,
            uri: `https://events-app-elifind.herokuapp.com/Image/${item.ImageID}/${item.FileName}`
        })
    }

    cancelImage = async () => {

        this.setState({ imageVisible: false })

    }

    setSettings = async (settings, title) => {
        const { back } = this.state;
        this.setState({
            currentSettings: await settings,
            currentTitle: await title,
            back: !back,
            images: [],
            posts: [],
            post: {},
            total: 0,
            average: 0,
            myRating: 0
        })
    }

    
  rate = async (rating) => {

    if (rating !== 0) {
      axios.post('https://events-app-elifind.herokuapp.com/Rating/Rate', { EventID: this.state.open._id, Rating: rating.toString() })
      const { average, total } = await this.getRatings(this.state.open._id);
      this.setState({
        average,
        total,
        myRating:rating,
       
      })
    }
  }

  setReview = async (review) => {
  
    this.setState({
      review
    })
  }

  review = async () => {
    if (this.state.review !== '') {
      const request = await axios.post('https://events-app-elifind.herokuapp.com/Review/Review', { EventID:this.state.open._id,
      Review: this.state.review })
      const {reviews} = this.state;
      if(request.data !== null){
        this.setState({
          reviews:[{...await this.state.user,Rating:this.state.myRating,...request.data},...await reviews],
          review:''
        })
      }
    }
  }

  renderReviews = ({ item }) => (

    <ReviewCardItem item={item} key={Math.random() + item._id + 'khuwajaSahran'}/>

  )



    render() {
        if (!this.state.loading) {
            return (
                <Container>
                    {this.state.currentSettings === 'OpenEvent' ?
                        [<Header title={this.state.currentTitle} back={this.state.back} setSettings={this.setSettings} key={Math.random() + 'wow'} />,
                        <OpenEvent data={{ ...this.state.user, ...this.state.open }} isOwner={this.state.open.Host}
                            images={this.state.images} posts={this.state.posts} publish={this.post}
                            setPost={this.setPost} renderItem={this.renderItemPost} post={this.state.post} uploadMedia={this.uploadMedia}
                            upload={this.upload} toggleModal={this.toggleModal} visible={this.state.visible} renderImage={this.renderImage}
                            join={this.join.bind(this)}  average={this.state.average} total={this.state.total} myRating={this.state.myRating} 
                            rate={this.rate}  setReview={this.setReview} review={this.review} reviewText={this.state.review} reviews={this.state.reviews}
                            renderReviews={this.renderReviews} />,
                        <ImageViewer uri={this.state.uri} visible={this.state.imageVisible} cancelImage={this.cancelImage}
                            key={Math.random() + 'wow'} />]
                        :
                        [<NewsfeedHeader search={this.search} />,
                        <Button onPress={this.refresh} key={Math.random()+'king'} block primary style={Styles.refresh}>
                            <Text>Refresh</Text></Button>,
                        <NewsfeedBody events={this.state.events} renderItem={this.renderItem} filter={this.state.filter} found={this.state.found}
                            key={Math.random() + 'wow'} />]
                    }
                </Container>
            )
        } else {
            return (
                <Loading />
            )
        }
    }
}