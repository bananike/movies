import React from 'react';
import Swiper from 'react-native-web-swiper';

const Carousel = ({ children }) => {
    return(
        <Swiper
            controlsEnabled={false}
            loop={true}
            timeout={5}
            springConfig={{speed: 5}}
        >
            {children}
        </Swiper>
    )
}

export default Carousel;