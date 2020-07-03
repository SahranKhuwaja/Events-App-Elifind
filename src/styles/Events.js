import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({


    image: {

        height: 200,
        width: 340,
        marginTop: -30,
        borderRadius: 25,
        marginBottom: 20,
        alignSelf:'center'
    },
    notFoundText: {

        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        alignSelf: 'center',
        color: '#808B96',
        marginBottom: 50

    },
    plus: {
        marginRight: 15,
        marginBottom: 15
    },
    content: {

        backgroundColor: 'white',
    },
    calendar: {
        height: 100,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 15,


    },
    calendarHeader: {
        color: 'white',
        marginBottom: 10,
        fontSize: 15
    },
    calendarNumber: {
        color: 'white',
        fontSize: 17

    },
    calendarName: {
        color: 'white',
        fontSize: 10,
        fontWeight: '700'

    },
    calendarHighlightNumber: {
        color: 'yellow',
        fontSize: 17,

    },
    calendarHighlightName: {
        color: 'yellow',
        fontSize: 10,
        fontWeight: '700',

    },

    calendarDisabled: {
        color: 'grey'
    },

    inputItem: {

        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        padding: 5,
        paddingLeft: 25,
        borderRadius: 15,
        marginTop: 10,

    },
    icon: {
        color: 'darkblue',
        fontSize: 25
    },
    textAreaIcon: {
        color: 'darkblue',
        fontSize: 30,
        marginTop: -160,

    },
    inputText: {
        fontSize: 20,
        paddingRight: 25,

    },
    textAreaText: {
        fontSize: 20,
        height: 200,
        marginTop: 15,
        paddingRight: 35,
        paddingLeft: 3


    },
    picker: {
        transform: [
            { scaleX: 1.2 },
            { scaleY: 1.2 },
        ],
        marginLeft: 23,
        marginRight: 27
    },
    createBtn: {
        marginTop: 10,
        justifyContent: 'center',
        borderRadius: 15
    },
    error: {
        marginTop: 7,
        padding: 10,
        marginLeft: 5,
        borderRadius: 300,
        width: 330,
    },
    errorText: {
        color: 'red',
        fontWeight: '700',
        fontSize: 16
    },
    serverError: {
        marginTop: 25,
        alignSelf: 'center',
        marginRight: 25

    },
    spinner: {
        alignSelf: 'center',
        marginTop: 60
    },
    flatlist: {
        padding: 5
    },
    eventImage: {
        height: 280,
        width: 'auto',
        display: 'flex',
        flex: 1
    },
    eventDp: {
        height: 210,
        width:'auto',
        borderRadius: 2,
        marginLeft: 14,
        borderWidth: 2,
        borderColor: 'cyan'

    },
    eventTitle: {
        fontWeight: 'bold',
        fontSize: 40,
        color: 'white',
        marginTop: -100,
        paddingLeft: 15,
        paddingBottom: 15

    },
    imageEvent: {
        height: 200,
        width: 180,
    },
    eventView: {
        flexDirection: 'row'
    },
    icon2: {
        paddingRight: 5,
        color: 'darkblue',
        fontSize: 32
    },
    icon3: {
        color: 'darkblue',
        fontSize: 30,
        paddingRight: 6
    },
    view2:{
        flexDirection:'column',
        marginLeft:15,
        marginTop:50
    },
    view3:{
        flexDirection:'row',
        marginBottom:10
    },
    view4:{
        flexDirection:'column',
        marginTop:2
    },
    tabSection:{
        marginTop:10,
        backgroundColor:'white',
    },
    tabContainer:{
        backgroundColor:'darkblue'
    },
    tabIcon:{
        fontSize:35
    },
    tabSection2:{
       margin:10
    },
    eventHeading:{
        fontWeight:'bold',
        fontSize:18,
        marginBottom:5
    },
    viewPost:{
        flexDirection:'row',
        borderWidth:1,
        padding:10,
        borderColor:'cyan'
    },
    writePostText:{
        marginTop:3,
        marginLeft:5,
        color:'grey'
    },
    nameLabel:{
        color:'darkblue',
        fontWeight:'bold'
    },
    notes:{
        fontWeight:'100'
    },
    postBody:{
        margin:20
    },
    postCard:{
        marginTop:10,
    },
    mediaItem:{
        borderBottomWidth:0.8,
        paddingBottom:10

    },
    uploadView:{
        borderWidth:1,
        borderColor:'darkblue',
        padding:3,
        borderRadius:20
    },
    uploadIcon:{
        color:'darkblue',
        fontSize:30,
    },
    mediaHead:{
        fontWeight:'bold',
        color:'darkblue',
        fontSize:17
    },

    imageView:{
        flex: 1, 
        flexDirection: 'column', 
        margin: 1,
   },
   image2:{
       height:120,
       width:'100%'
   },
   imageFlatlist:{
       marginTop:40,
       marginBottom:40
   },
   imageHeader:{
       fontSize:30,
       color:'darkblue',
       alignSelf:'center',
       marginBottom:10,
       fontWeight:'bold'
   },
   headView:{
       backgroundColor:'white',
       flex:1
   },
   joined:{
       padding:0,
       width:100
    },
    ratingsHeading:{
        marginTop:5,
        marginBottom:5,
        color:'darkblue',
        fontSize:30,
        alignSelf:'center',
        fontWeight:'bold'
    },
    totalRatings:{
        alignSelf:'flex-end',
        marginRight:15
    },
    review:{
    
        width:'100%'
    },
    refresh:{
        margin:10
    },
    refreshText:{
        alignSelf:'center'
    }




});

export default Styles;