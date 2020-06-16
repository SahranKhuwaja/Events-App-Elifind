import { StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    
    
    cover:{
        width:'100%',
        height:'50%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    dp:{
        alignSelf:'center',
        height:150,
        width:150,
        borderRadius:100,
        borderWidth:2,
        borderColor:'white'
        
    },
    upload:{
        marginTop:-32,
        color:'white'
    },
    name:{
        fontSize:30,
        fontWeight:'bold',
        marginTop:15,
        alignSelf:'center'
    },
    view:{
        flexDirection:'row',
        justifyContent:'center'
    },
    headDetails:{
        alignSelf:'center',
        color:'darkblue',
        fontWeight:'700',
        paddingBottom:10
    },
    headIcon:{
        fontSize:23,
        paddingRight:5,
        color:'darkblue',
        
    },
    content:{
        marginTop:-120,
        padding:10
    },
    card:{
        height:300,
    },
    cardItem:{
        flexDirection:'row',
        paddingBottom:5,
    },
    body:{
        color:'#404040'
    },
    modalView:{
        backgroundColor:'white',
        height:250,
        marginTop:380
    },
    modalHeader:{
        backgroundColor:'white',
      
    },
    modalHeadText:{
        fontSize:20,
        fontWeight:'bold',
        color:'darkblue'
    },
    modalHeaderBody:{
        marginLeft:50
    },
    modalFooter:{
      
        backgroundColor:'white'
    },
    modalCancel:{
        width:'95%',
        justifyContent:'center'
    },
    modalItem:{
        height:65,
        justifyContent:'center',
        marginLeft:-10
    },
    modalItem2:{
        borderBottomWidth:1
    },
    itemText:{
        fontSize:17,
    },
    itemIcon:{
        fontSize:23,
    }
    


   
  });
export default styles;