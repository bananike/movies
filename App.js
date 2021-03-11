import React, { useState } from 'react';
import { Image, StatusBar } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import Drawer from './navigation/Drawer';
import Btn from './Btn';

const cacheImages = images => images.map(image =>{
    if(typeof image === "string"){
        return Image.prefetch(image)
    }else{
        return Asset.fromModule(image).downloadAsync();
    }
});

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

export default function App() {
    const [isReady, setIsReady] = useState(false);
    const loadAssets = () => {
        const images = cacheImages([
            "https://images.unsplash.com/photo-1614648718611-0635f29016cb?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            require("./assets/splash.png"),
            require("./assets/loader-1.png"),
            require("./assets/loader-2.png"),
            require("./assets/loader-3.png"),
            "https://images.unsplash.com/photo-1587892106866-e6b362b35449?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2548&q=80"
        ]);
        const fonts = cacheFonts([Ionicons.font, FontAwesome.font, Entypo.font]);
        return Promise.all([...images, ...fonts]);
    };
    const onFinish = () => setIsReady(true);
    return (
        isReady ?
            <>
                <StatusBar/>
                <NavigationContainer>
                    <Drawer images={cacheImages} />
                </NavigationContainer>
                <StatusBar barStyle="light-content" />
            </>
            :
            <AppLoading
                startAsync={loadAssets}
                onFinish={onFinish}
                onError={console.error}
            />
            
    );
}
