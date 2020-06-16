import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 812,
      backgroundColor: '#FFE8F9',
      
    },
    input: {
      width: 300,
      height: 44,
      shadowColor: 'rgba(199, 208, 248, 0.5)',
      shadowOffset: { width: 6, height: 0 },
      shadowRadius: 20,
      borderRadius: 100,
      backgroundColor: '#ffffff',
      paddingLeft:20,
      fontWeight: '400',
      fontSize:16,
      paddingTop:10,
      flexDirection:'row',
      paddingTop:0,
      marginTop:15,

    },
    inputText:{
      fontSize:16,
      width:220
    },
    view:{
      marginTop:15
    },
    inputIcon:{

      paddingTop:8,
      paddingRight:18,
      color:'darkblue'

    },
    
    forgotPassword: {

      opacity: 0.9,
      color: '#757575',
      paddingTop:8,
      paddingLeft:130,
      fontSize: 12,
      fontWeight: '400',
      
    },
    btn: {
      width: 115,
      height: 44,
      shadowColor: 'rgba(74, 164, 186, 0.5)',
      shadowOffset: { width: 6, height: 0 },
      shadowRadius: 20,
      borderRadius: 100,
      backgroundColor:'rgb(54,45,51)'
    },
    txt:{
      color: '#fafafa',
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 17,
      paddingTop:14,
      paddingLeft:30
    },
    bg:{
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      alignItems:'center',
      width:'100%'
    },
    image:{
      width:330,
      height:270
    },
    signupLabel:{
    
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
      lineHeight: 17,
    },
    signupView:{
       justifyContent:'center',
       alignItems:'flex-end',
       paddingTop:30
    },
    signupA:{
      color:'yellow',
      fontWeight:'700',
    
    },
    errorText:{
      color:'red',
      fontWeight:'700',
      fontSize:16
    },
    serverError:{
      marginTop:20
    },
    spinner:{
      marginTop:50,
      alignSelf:'center'
    }
    
    
  });

  export default styles;