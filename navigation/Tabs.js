import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Movies from '../screens/Movies/MoviesContainer';
import Tv from '../screens/Tv/TvContainer';
import Search from '../screens/Search';
import Favs from '../screens/Favs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const Tabs = createBottomTabNavigator();

const getHeaderName = (route) => {
    return getFocusedRouteNameFromRoute(route)??'Movies';
}

export default ({ navigation, route }) => {
    const name = getHeaderName(route);
    useLayoutEffect(() => {
        navigation.setOptions({ 
            title: name,
        });
    }, [route]);
    return(
        <Tabs.Navigator
            screenOptions={({ route }) => {
                return {
                    tabBarIcon: ({ focused }) => {
                        let iconName = Platform.OS === 'android' ? 'md-' : 'ios-';
                        if(route.name === 'Movies'){
                            iconName += 'film';
                        }else if(route.name === 'TV'){
                            iconName += 'tv';
                        }else if(route.name === 'Search'){
                            iconName += 'search';
                        }else if(route.name === 'Favourites'){
                            iconName += 'heart';
                        }
                        return (
                        <Ionicons
                            name={iconName}
                            color={focused ? '#fff' : '#444'}
                            size={16}
                        />
                        );
                    }
                }
            }}
            tabBarOptions={{
                showLabel: false,
                style: {
                    backgroundColor: '#222',
                    borderTopColor: '#222'
                }
            }}
            >
            <Tabs.Screen
                name="Movies"
                component={Movies}
            />
            <Tabs.Screen
                name="TV"
                component={Tv}
            />
            <Tabs.Screen
                name="Search"
                component={Search}
            />
            <Tabs.Screen
                name="Favourites"
                component={Favs}
            />
        </Tabs.Navigator>
    )
}