import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({

    cardItem:{
        flexDirection:'row'
    },
    cardText:{
        marginLeft:10,
        fontSize:18,
        fontWeight:'700',
    },
    dp:{
        alignSelf:'center',
        height:150,
        width:150,
        borderRadius:100,
        borderWidth:2,
        borderColor:'white'
        
    },
    item:{
        marginRight:23,
        borderBottomWidth:1
    },
    txt:{
        marginLeft:22,
        color:'grey',
        fontSize:12,
        marginTop:5

    },
    error:{
        marginTop:7,
        padding:10,
        marginLeft:38,
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
      securityTitle:{
        color:'darkblue',
        alignSelf:'center',
        fontWeight:'700',
        fontSize:22,
        marginBottom:30
      }
    





})

export default Styles;