import React from 'react';
import { View, Text, Icon, Item, Left, Body, Right } from 'native-base';
import { FlatList } from 'react-native';
import Modal from '../sub-screens/Modal';
import StickyHeader from './StickyHeader';
import Styles from '../../styles/Events';

const MediaTab = (props) => {

    return (<View>
        {props.isOwner ?
            <View style={{...Styles.tabSection2,marginBottom:-10}}>

                <Item style={Styles.mediaItem}>
                    <Left />
                    <Body>
                        <Text style={Styles.mediaHead}>Upload Images</Text>
                    </Body>
                    <Right>
                        <View style={Styles.uploadView} onTouchStart={props.uploadMedia}>
                            <Icon name="ios-cloud-upload" style={Styles.uploadIcon} ></Icon>
                        </View>
                    </Right>
                    <Modal visible={props.visible} toggleModal={props.toggleModal} upload={props.upload} title="Upload Media" media={true} />
                </Item>

            </View>
            : null}
        <FlatList
            ListHeaderComponent={<StickyHeader tag="Images" />}
            data={props.images}
            numColumns={3}
            keyExtractor={item => item._id + Math.random()}
            renderItem={props.renderImage}
            style={Styles.imageFlatlist}
            stickyHeaderIndices={[0]}>
        </FlatList>
    </View>
    )
}

export default MediaTab;