import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Menu from '../navigation/Menu';

export default ({ navigation }) => {
    return(
        <>
            <View
                style={{flex: 1, alignItems: 'center', width: '100%'}}
            >
                <Text>second</Text>
            </View>
            <Menu navigation={navigation} />
        </>
    )
}