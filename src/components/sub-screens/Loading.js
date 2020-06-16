import React from 'react';
import {Spinner} from 'native-base';
import styles from '../../styles/Loading';

const Loading = ()=>{

    return(
        <Spinner size="large" color='black' style={styles.spinner}></Spinner>
    );
}

export default Loading;