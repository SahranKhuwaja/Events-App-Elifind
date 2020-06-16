import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#FFE8F9',

    },
    headView:{
      marginTop:-30
    },
    input: {
      width: 320,
      height: 44,
      shadowColor: 'rgba(199, 208, 248, 0.5)',
      shadowOffset: { width: 6, height: 0 },
      shadowRadius: 20,
      borderRadius: 100,
      backgroundColor: '#ffffff',
      paddingLeft:20,
      fontWeight: '400',
      paddingTop:10,
      flexDirection:'row',
      paddingTop:0,
      marginTop:7,
    },

    radio:{

      paddingLeft:20,
      fontWeight: '400',
      paddingTop:10,
      flexDirection:'row',
      paddingTop:0,
      marginTop:10

    },
    radioText:{
      color:'white',
      fontSize:16,
      paddingLeft:20,
      paddingRight:20
    },
    radioLeft:{ 
      flexDirection: 'row', 
      paddingLeft:25 
    },
    inputText:{
      fontSize:16,
      width:270
    },
    inputIcon:{

      paddingTop:8,
      paddingRight:18,
      color:'darkblue'

    },
    inputIconC:{

      paddingTop:8,
      paddingRight:8,
      color:'darkblue'


    },
    picker:{
      paddingLeft: 10, 
      paddingRight: 8,
      paddingTop: 1
    },
    bg:{
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-start',
        alignItems:'center',
        width:'100%',
      },
    image:{
        width:290,
        height:290
    },
    heading:{
          color:'white',
          fontSize:30,
          fontWeight:'bold'

    },
    
    calenderText:{
     
      paddingTop:10,
      fontSize:16,
    },
    buttomView:{
      marginTop:10,
      justifyContent:'center',
      marginBottom:50
     
    },
    btn:{
      width:120,
      justifyContent:'center',
    },
    error:{
      marginTop:7,
      padding:10,
      marginLeft:45,
      borderRadius:300,
      width:330,
    },
    errorText:{
      color:'red',
      fontWeight:'700',
      fontSize:16
    },
    serverError:{
      marginTop:-40
    },
    spinner:{
      alignSelf:'center'
    }
 
    
  });

  export default styles;