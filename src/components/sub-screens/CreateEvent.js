import React from 'react';
import { Image } from 'react-native';
import { Content, Text, Item, Input, Icon, Textarea, Picker, Button,View } from 'native-base';
import CalendarStrip from 'react-native-calendar-strip';
import Styles from '../../styles/Events';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CreateEvent = (props) => {

    const whiteList = [
        {
            start: moment(Date.now()).format('L'),
            end: '2025-12-31'

        }
    ]


    return (
        <Content padder style={Styles.content}>
            <Image source={require('../../assets/images/createEvent.png')}
                style={Styles.image}></Image>

                 {props.errors.length!==0?
                <View style={Styles.error}> 
                   {props.errors.map((e,i)=>{
                     
                   return  <Text style={Styles.errorText} key={Math.random() + i}>* {e.error}</Text>

                   })
                   
                   }
                  
                </View>
                : null
                }
            <CalendarStrip
                scrollable
                daySelectionAnimation={{ type: 'border', borderWidth: 1, duration: 1, borderHighlightColor: 'white' }}
                calendarAnimation={{ duration: 1 }}
                style={Styles.calendar}
                calendarHeaderStyle={Styles.calendarHeader}
                calendarColor={'darkblue'}
                dateNumberStyle={Styles.calendarNumber}
                dateNameStyle={Styles.calendarName}
                highlightDateNumberStyle={Styles.calendarHighlightNumber}
                highlightDateNameStyle={Styles.calendarHighlightName}
                disabledDateNameStyle={Styles.calendarDisabled}
                disabledDateNumberStyle={Styles.calendarDisabled}
                iconContainer={{ flex: 0.1 }}
                startingDate={moment(Date.now()).format('L')}
                datesWhitelist={whiteList}
                onDateSelected={props.setDate}
            />

            <Item style={Styles.inputItem}>

                <Icon name="calendar-alt" type="FontAwesome5" style={Styles.icon}></Icon>
                <Input placeholder="Event Name" style={Styles.inputText} onChangeText={props.setName}></Input>
            </Item>
            <Item style={Styles.inputItem} onPress={props.showTimePicker}>
                <Icon name="clock" type="FontAwesome5" style={Styles.icon}></Icon>
                <Input style={Styles.inputText} placeholder="Schedule At" disabled={true} value={props.event.ScheduleAt}></Input>
                <DateTimePickerModal
                    isVisible={props.isVisible}
                    mode="time"
                    onConfirm={props.handleConfirm}
                    onCancel={props.hideTimePicker}
                />

            </Item>

            <Item style={Styles.inputItem}>
                <Icon name="hand-pointer" type="FontAwesome5" style={Styles.icon}></Icon>
                <Picker
                    placeholder="Event Type"
                    mode="dropdown"
                    style={Styles.picker}
                    onValueChange={props.setType}
                    selectedValue={props.event.Type}
                    iosHeader="Event Type"
                    iosIcon={<Icon name="arrow-down"
                    />}
                >
                    {
                        props.types.map((e, i) => {
                            return <Picker.Item label={e} value={e} key={"key" + i}
                            />
                        })
                    }
                </Picker>
            </Item>
            <Item style={Styles.inputItem}>
                <Icon name="hand-pointer" type="FontAwesome5" style={Styles.icon}></Icon>
                <Picker
                    placeholder="Event Category"
                    mode="dropdown"
                    style={Styles.picker}
                    onValueChange={props.setCategory}
                    selectedValue={props.event.Category}
                    iosHeader="Event Category"
                    iosIcon={<Icon name="arrow-down"
                    
                    />}
                >
                    {
                        props.categories.map((e, i) => {
                            return <Picker.Item label={e} value={e} key={"key" + i}
                            />
                        })
                    }
                </Picker>
            </Item>
            <Item style={Styles.inputItem}>
                <Icon name="information-circle-outline" type="Ionicons" style={Styles.textAreaIcon}></Icon>
                <Textarea placeholder="Event Description" style={Styles.textAreaText} onChangeText={props.setDescription}></Textarea>
            </Item>

            <Button primary style={Styles.createBtn} onPress={props.schedule}>
                <Text>Schedule</Text>
            </Button>


        </Content>

    )




}

export default CreateEvent;