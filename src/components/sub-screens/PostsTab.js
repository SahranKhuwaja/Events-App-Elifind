import React from 'react';
import {Text,View, Icon,Textarea,Button} from 'native-base';
import {FlatList} from 'react-native';
import Styles from '../../styles/Events';

const PostsTab = (props)=>{

    return(
        <View style={Styles.tabSection2}>
        { props.isOwner?
          [
           <View style={Styles.viewPost} key={Math.random().toString()}>
               <Icon name="edit" type="FontAwesome5" style={{color:'grey'}}></Icon>
               <Text style={Styles.writePostText}>Write post</Text>
            </View>,
            <Textarea rowSpan={5} placeholder="Write post" style={{...Styles.viewPost,borderTopWidth:0}} 
                onChangeText={props.setPost} value={props.post}/>,
            <Button block bordered style={Styles.viewPost} onPress={props.publish}>
            <Text>Publish</Text>
          </Button> 
          ]
            : null
        }
         <FlatList
                data={props.posts}
                numColumns={1}
                keyExtractor={item => item._id + Math.random()}
                renderItem={props.renderItem}
                style={Styles.flatlist}
                ListFooterComponent={()=>(<Text notes style={Styles.footText}> {'\u00A9'}Elifind Events App. All rights reserved.</Text>)}>
        </FlatList>
        
        </View>
    )
}

export default PostsTab;