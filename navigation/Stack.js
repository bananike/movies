import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Detail from '../screens/Detail';
import Tabs from './Tabs';
import Menu from './Menu';

const Stack = createStackNavigator();

export default ({ navigation }) => {
    return(
        <>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#222',
                        borderBottomColor: 'transparent',
                        shadowColor: 'transparent'
                    },
                    headerTintColor: '#fff',
                    headerBackTitleVisible: false,
                    animationEnabled: true
                }}
            >
                <Stack.Screen
                    name="Tabs"
                    component={Tabs}
                    // options={{
                    //     animationEnabled: true
                    // }}
                />
                <Stack.Screen
                    name="Detail"
                    component={Detail}
                    // options={{
                    //     animationEnabled: true
                    // }}
                />
            </Stack.Navigator>
            <Menu navigation={navigation} />
        </>
    )
}