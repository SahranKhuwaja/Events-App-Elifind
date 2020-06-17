import {StyleSheet} from 'react-native';

const Styles =  StyleSheet.create({


    image:{

       height:200,
       width:340,
       marginTop:-30,
       borderRadius:25,
       marginBottom:20,
       marginLeft:5,
       marginRight:5
    },
    notFoundText:{

        fontSize:30,
        fontWeight:'bold',
        marginTop:20,
        alignSelf:'center',
        color:'#808B96',
        marginBottom:50

    },
    plus:{
        marginRight:15,
        marginBottom:15
    },
    content:{

       backgroundColor:'white',
    },
    calendar:{
        height: 100, 
        paddingTop: 20, 
        paddingBottom: 20,
        borderRadius:15,
        
       
    },
    calendarHeader:{
        color: 'white',
        marginBottom:10,
        fontSize:15
    },
    calendarNumber:{
        color: 'white',
        fontSize:17
     
    },
    calendarName:{
        color: 'white',
        fontSize:10,
        fontWeight:'700'
        
    },
    calendarHighlightNumber:{
        color: 'yellow',
        fontSize:17,
       
    },
    calendarHighlightName:{
        color: 'yellow',
        fontSize:10,
        fontWeight:'700',
       
    },

    calendarDisabled:{
        color: 'grey'
    },
 
    inputItem:{

        borderTopWidth:1,
        borderBottomWidth:1,
        borderLeftWidth:1,
        borderRightWidth:1,
        padding:5,
        paddingLeft:25,
        borderRadius:15,
        marginTop:10,
       
    },
    icon:{
        color:'darkblue',
        fontSize:25
    },
    textAreaIcon:{
        color:'darkblue',
        fontSize:30,
        marginTop:-160,

    },
    inputText:{
        fontSize:20,
        paddingRight:25,
       
    },
    textAreaText:{
        fontSize:20,
        height:200,
        marginTop:15,
        paddingRight:35,
        paddingLeft:3
        
        
    },
    picker:{
        transform: [
        { scaleX: 1.2 }, 
        { scaleY: 1.2 },
     ],
     marginLeft:23,
     marginRight:27
    },
    createBtn:{
        marginTop:10,
        justifyContent:'center',
        borderRadius:15
    },
    error:{
        marginTop:7,
        padding:10,
        marginLeft:5,
        borderRadius:300,
        width:330,
      },
      errorText:{
        color:'red',
        fontWeight:'700',
        fontSize:16
      },
      serverError:{
        marginTop:25,
        alignSelf:'center',
        marginRight:25
        
      },
      spinner:{
        alignSelf:'center',
        marginTop:60
      },
      flatlist:{
          padding:5   
      }

   


});

export default Styles;