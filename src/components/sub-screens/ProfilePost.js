import React from 'react';
import { Textarea, Item } from 'native-base';
import Styles from '../../styles/Post.js';

const ProfilePost = (props) => {
    return (
        <Item style={Styles.item}>
            <Textarea placeholder="Post here" />
        </Item>
    );
}

export default ProfilePost;