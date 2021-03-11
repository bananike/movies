import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Menu from '../navigation/Menu';

export default ({ navigation }) => {
    return(
        <>
            <View
                style={{flex: 1, alignItems: 'center', width: '100%'}}
            >
                <Text>loading</Text>
            </View>
            <Menu navigation={navigation} />
        </>
    )
}