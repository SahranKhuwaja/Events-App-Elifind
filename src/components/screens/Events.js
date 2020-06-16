import React, { Component } from 'react';
import { isEqual } from 'lodash';
import axios from 'axios';
import Header from '../sub-screens/Header';
import Loading from '../sub-screens/Loading';
import { Container } from 'native-base';
import EventsBody from '../sub-screens/EventsBody';
import CreateEvent from '../sub-screens/CreateEvent';
import EventsFooter from '../sub-screens/EventsFooter';
import moment from 'moment';

export default class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events:[],
            currentSettings: undefined,
            currentTitle: 'Events',
            event:{},
            create:false,
            types:['Virtual','Non-Virtual'],
            categories:['Entertainment','Education','Conference','Technology',
            'Music','Seminar','Webinar','Marketing','Promotion','Product Launch'],
            isVisible:false
            
        }
     
      this.toggleDrawer = this.toggleDrawer.bind(this);
      this.setSettings = this.setSettings.bind(this);
      this.createEvent = this.createEvent.bind(this);
      this.showTimePicker = this.showTimePicker.bind(this);

      this.handleConfirm= this.handleConfirm.bind(this);
    }

    componentDidMount = async()=>{

        this.setState({
            ready:true
        })
    }

    toggleDrawer = () => {
        this.props.navigation.toggleDrawer();
    }

    createEvent = async()=>{
       this.setSettings('CreateEvent','Schedule')
       
    }

    setSettings = async (settings, title, cancel) => {
        const { create } = this.state;
        if(cancel){
          await this.revert()
        }
        this.setState({
          currentSettings: await settings,
          currentTitle: await title,
          create:!create
        })
    
      }

      revert = async()=>{

        this.setState({
          event:{}
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

      handleConfirm = async(ScheduleAt)=>{
        const {event} = this.state;
        this.setState({
            event:{...event,ScheduleAt:await moment(ScheduleAt).format('LT')},
            isVisible:false
        })

      }
   

    render() {

        if (this.state.ready) {
            return (
                <Container>
                     <Header toggle={this.toggleDrawer} title={this.state.currentTitle} create={this.state.create}
                     setSettings={this.setSettings.bind(this)}/>
                    {this.state.currentSettings==='CreateEvent'?
                    <CreateEvent types={this.state.types} categories={this.state.categories} showTimePicker={this.showTimePicker}
                      hideTimePicker={this.hideTimePicker.bind(this)} isVisible={this.state.isVisible} handleConfirm={this.handleConfirm}
                      event={this.state.event}/>
                    :
                    [<EventsBody key="body"/>,
                    <EventsFooter key="footer" createEvent={this.createEvent.bind(this)}/>]
                    }
                   
                    
                </Container>
            )
        } else {
            return <Loading />
        }
    }
}