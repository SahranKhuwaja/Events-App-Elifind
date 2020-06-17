import React, { Component } from 'react';
import axios from 'axios';
import Header from '../sub-screens/Header';
import Loading from '../sub-screens/Loading';
import { Container } from 'native-base';
import {Image} from 'react-native';
import EventsBody from '../sub-screens/EventsBody';
import CreateEvent from '../sub-screens/CreateEvent';
import EventsFooter from '../sub-screens/EventsFooter';
import moment from 'moment';
import { forOwn } from 'lodash';
import CardItemEvent from '../sub-screens/CardItemEvent';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      currentSettings: undefined,
      currentTitle: 'Events',
      event: {
        Name: '',
        ScheduleAt: '',
        Date: '',
        Type: '',
        Category: '',
        Description: '',
      },
      create: false,
      types: ['Virtual', 'Non-Virtual'],
      categories: ['Entertainment', 'Education', 'Conference', 'Technology',
        'Music', 'Seminar', 'Webinar', 'Marketing', 'Promotion', 'Product Launch'],
      isVisible: false,
      errors: []

    }

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.showTimePicker = this.showTimePicker.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.setName = this.setName.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setType = this.setType.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.schedule = this.schedule.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount = async () => {
    const events = await this.getEvents();
    await this.changeState(events)
  }

  toggleDrawer = (events) => {
    this.props.navigation.toggleDrawer();
  }

  getEvents = async () => {

    const request = await axios.get('http://192.168.8.103:3000/Event/Get');
    return request.data;

  }

  changeState = (events) => {

    const { event } = this.state;
    this.setState({
      ready: true,
      event: { ...event, Type: 'Virtual', Category: 'Entertainment' },
      events

    })
  }

  createEvent = async () => {
    this.setSettings('CreateEvent', 'Schedule')

  }

  setSettings = async (settings, title, cancel) => {
    const { create } = this.state;
    if (cancel) {
      await this.revert()
    }
    this.setState({
      currentSettings: await settings,
      currentTitle: await title,
      create: !create
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
    const request = await axios.post('http://192.168.8.103:3000/Event/Schedule', this.state.event);
    if (request.data!==undefined){
      await this.saveEventState(request.data)
      await this.setSettings('Events', 'Events')

    }
  }

  saveEventState = async(event)=>{
    const {events} = this.state;
    this.setState({
      events:[...events,event],
      event:{}
    })
  }


  renderItem = ({ item }) => (

    <CardItemEvent item={item}/>
    
  )

  render() {

    if (this.state.ready) {
      return (
        <Container>
          <Header toggle={this.toggleDrawer} title={this.state.currentTitle} create={this.state.create}
            setSettings={this.setSettings.bind(this)} />
          {this.state.currentSettings === 'CreateEvent' ?
            <CreateEvent types={this.state.types} categories={this.state.categories} showTimePicker={this.showTimePicker}
              hideTimePicker={this.hideTimePicker.bind(this)} isVisible={this.state.isVisible} handleConfirm={this.handleConfirm}
              event={this.state.event} schedule={this.schedule} errors={this.state.errors} setName={this.setName}
              setDate={this.setDate} setType={this.setType} setCategory={this.setCategory}
              setDescription={this.setDescription} />
            :
            [<EventsBody key="body" events={this.state.events} renderItem={this.renderItem} />,
            <EventsFooter key="footer" createEvent={this.createEvent.bind(this)} />]
          }


        </Container>
      )
    } else {
      return <Loading />
    }
  }
}