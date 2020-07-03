import React, { Component } from 'react';
import axios from 'axios';
import Header from '../sub-screens/Header';
import Loading from '../sub-screens/Loading';
import { Container } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import EventsBody from '../sub-screens/EventsBody';
import CreateEvent from '../sub-screens/CreateEvent';
import EventsFooter from '../sub-screens/EventsFooter';
import moment from 'moment';
import { forOwn, isEqual } from 'lodash';
import CardItemEvent from '../sub-screens/CardItemEvent';
import OpenEvent from '../sub-screens/OpenEvent';
import PostCardItem from '../sub-screens/PostCardItem';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ImageViewer from '../sub-screens/ImageModal';
import ReviewCardItem from '../sub-screens/ReviewCardItem';
import { Buffer } from 'buffer';
import Styles from '../../styles/Events';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      currentSettings: undefined,
      currentTitle: 'Events',
      user: undefined,
      event: {
        Name: '',
        ScheduleAt: '',
        Date: '',
        Type: '',
        Category: '',
        Location: '',
        Description: '',
      },
      back: false,
      types: ['Virtual', 'Non-Virtual'],
      categories: ['Entertainment', 'Education', 'Conference', 'Technology',
        'Music', 'Seminar', 'Webinar', 'Marketing', 'Promotion', 'Product Launch'],
      isVisible: false,
      visible: false,
      imageVisible: false,
      uri: '',
      errors: [],
      load: false,
      open: undefined,
      post: "",
      images: [],
      posts: [],
      average: 0,
      total: 0,
      myRating: 0,
      review: '',
      reviews:[]
    }

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.showTimePicker = this.showTimePicker.bind(this);
    this.hideTimePicker = this.hideTimePicker.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.setName = this.setName.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setType = this.setType.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.schedule = this.schedule.bind(this);
    this.renderItem = this.renderItem.bind(this);
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

  }

  componentDidMount = async () => {
    const user = await this.getUserData();
    const events = await this.getEvents();
    await this.changeState(user, events)
  }

  shouldComponentUpdate = async (nextProps, nextState) => {

    return (!isEqual(this.state.events, nextState.events)) || (!isEqual(this.state.user, nextState.user))
      || (!isEqual(this.state.currentSettings, nextState.currentSettings)) || (!isEqual(this.state.currentTitle, nextState.currentTitle))
      || (!isEqual(this.state.event, nextState.event)) || (!isEqual(this.state.back, nextState.back))
      || (!isEqual(this.state.visible, nextState.visible)) || (!isEqual(this.state.isVisible, nextState.isVisible))
      || (!isEqual(this.state.imageVisible, nextState.imageVisible)) || (!isEqual(this.state.images, nextState.images))
      || (!isEqual(this.state.posts, nextState.posts)) || (!isEqual(this.state.post, nextState.post))
      || (!isEqual(this.state.load, nextState.load)) || (!isEqual(this.state.open, nextState.open))
      || (!isEqual(this.state.errors, nextState.errors) || (!isEqual(this.state.average, nextState.average)
      || (!isEqual(this.state.total, nextState.total)) || (!isEqual(this.state.review, nextState.review)) 
      || (!isEqual(this.state.reviews, nextState.reviews))))

  }

  toggleDrawer = (events) => {
    this.props.navigation.toggleDrawer();
  }

  getUserData = async () => {
    if (this.props.route.params) {
      return this.props.route.params.user
    } else {
      const data = await axios.get('https://events-app-elifind.herokuapp.com/User/Profile');
      return await data.data.user;
    }
  }

  getEvents = async () => {

    const request = await axios.get('https://events-app-elifind.herokuapp.com/Event/Get');
    return request.data;

  }

  changeState = (user, events) => {

    const { event } = this.state;
    this.setState({
      ready: true,
      user,
      event: { ...event, Type: 'Virtual', Category: 'Entertainment' },
      events

    })
  }

  createEvent = async () => {
    this.setSettings('CreateEvent', 'Schedule')

  }

  setSettings = async (settings, title, cancel) => {
    const { back } = this.state;
    if (cancel) {
      await this.revert()
    }
    this.setState({
      currentSettings: await settings,
      currentTitle: await title,
      back: !back,
      images: [],
      posts: [],
      post: {},
      total: 0,
      average: 0,
      myRating: 0,
      review: ''
    })

  }

  revert = async () => {

    this.setState({
      event: {}
    })

  }
  showTimePicker = () => {
    this.setState({
      isVisible: true
    })
  };

  hideTimePicker = () => {
    this.setState({
      isVisible: false
    })
  };

  handleConfirm = async (ScheduleAt) => {
    const { event } = this.state;
    this.setState({
      event: { ...event, ScheduleAt: await moment(ScheduleAt).format('LT') },
      isVisible: false
    })

  }

  setName = (Name) => {
    const { event } = this.state;
    this.setState({
      event: { ...event, Name }
    })
  }
  setDate = (Date) => {
    const { event } = this.state;
    this.setState({
      event: { ...event, Date }
    })
  }
  setType = (Type) => {
    const { event } = this.state;
    this.setState({
      event: { ...event, Type }
    })
  }
  setCategory = (Category) => {
    const { event } = this.state;
    this.setState({
      event: { ...event, Category }
    })
  }
  setLocation = (Location) => {
    const { event } = this.state;
    this.setState({
      event: { ...event, Location }
    })
  }
  setDescription = (Description) => {
    const { event } = this.state;
    this.setState({
      event: { ...event, Description }
    })
  }

  schedule = async () => {


    if (await this.validate()) {
      await this.scheduleEvent()
    }

  }

  validate = async () => {

    return await this.Check();

  }
  Check = async () => {
    const { event } = this.state;
    let errors = [];

    await forOwn(event, (value, key) => {
      if (value === '') {
        errors.push({ error: key + ' is required!' })

      }
      if (value !== '' && key === 'Description') {
        if (value.length <= 20) {
          errors.push({ error: key + ' is too short! It must be more than 20 letters!' })
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

  scheduleEvent = async () => {
    this.setState({
      load: true
    })
    const request = await axios.post('https://events-app-elifind.herokuapp.com/Event/Schedule', this.state.event);
    if (request.data !== undefined) {
      await this.saveEventState(request.data)
      await this.setSettings('Events', 'Events')

    }
  }

  saveEventState = async (event) => {
    const { events } = this.state;
    this.setState({
      events: [...await events, await event],
      event: { Type: 'Virtual', Category: 'Entertainment' },
      load: false
    })
  }


  renderItem = ({ item }) => (

    <CardItemEvent item={item} key={Math.random() + item._id} open={this.open}
    />

  )

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
      myRating,
      reviews


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

    <PostCardItem item={item} key={Math.random() + item._id + 'SK'} user={this.state.user} />
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

  rate = async (rating) => {

    if (rating !== 0) {
      axios.post('https://events-app-elifind.herokuapp.com/Rating/Rate', { EventID: this.state.open._id, Rating: rating.toString() })
      const { average, total } = await this.getRatings(this.state.open._id);
      this.setState({
        average,
        total,
        myRating: rating,

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

    if (this.state.ready) {
      return (
        <Container>
          <Header toggle={this.toggleDrawer} title={this.state.currentTitle} back={this.state.back}
            setSettings={this.setSettings} />
          {this.state.currentSettings === 'CreateEvent' ?
            <CreateEvent types={this.state.types} categories={this.state.categories} showTimePicker={this.showTimePicker}
              hideTimePicker={this.hideTimePicker} isVisible={this.state.isVisible} handleConfirm={this.handleConfirm}
              event={this.state.event} schedule={this.schedule} errors={this.state.errors} setName={this.setName}
              setDate={this.setDate} setType={this.setType} setCategory={this.setCategory}
              setLocation={this.setLocation} setDescription={this.setDescription} load={this.state.load} />
            :
            this.state.currentSettings === 'OpenEvent' ?
              <OpenEvent data={{ ...this.state.user, ...this.state.open }} isOwner={this.state.user._id === this.state.open.Owner}
                images={this.state.images} posts={this.state.posts} publish={this.post}
                setPost={this.setPost} renderItem={this.renderItemPost} post={this.state.post} uploadMedia={this.uploadMedia}
                upload={this.upload} toggleModal={this.toggleModal} visible={this.state.visible} renderImage={this.renderImage}
                average={this.state.average} total={this.state.total} myRating={this.state.myRating} rate={this.rate}
                setReview={this.setReview} review={this.review} reviewText={this.state.review} reviews={this.state.reviews}
                renderReviews={this.renderReviews}/>
              :
              [<EventsBody key="body" events={this.state.events} renderItem={this.renderItem} />,
              <EventsFooter key="footer" createEvent={this.createEvent.bind(this)} />]
          }

          <ImageViewer uri={this.state.uri} visible={this.state.imageVisible} cancelImage={this.cancelImage} />
        </Container>
      )
    } else {
      return <Loading />
    }
  }
}