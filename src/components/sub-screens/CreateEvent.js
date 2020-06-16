import React from 'react';
import { Image } from 'react-native';
import { Content, Text, Item, Input, Icon, Textarea, Picker, Button } from 'native-base';
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
            />

            <Item style={Styles.inputItem}>

                <Icon name="calendar-alt" type="FontAwesome5" style={Styles.icon}></Icon>
                <Input placeholder="Event Name" style={Styles.inputText}></Input>
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
                <Textarea placeholder="Event Description" style={Styles.textAreaText}></Textarea>
            </Item>

            <Button primary  style={Styles.createBtn}>
                <Text>Schedule</Text>
            </Button>



        </Content>

    )




}

export default CreateEvent;