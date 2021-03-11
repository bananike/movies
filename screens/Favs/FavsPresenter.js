import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, PanResponder, Animated } from 'react-native';
import { apiImageHigh } from '../../API';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const Container = styled.View`
    flex: 1;
    background-color: #222;
    align-items: center;
    padding-top: 30px;
`;

const Card = styled.View`
    
`;

const Poster = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
`;

const styles = {
    height: HEIGHT / 1.35,
    width: WIDTH - 40,
    position: 'absolute',
    top: '50',
}

export default ({ results }) => {
    const [topIndex, setTopIndex] = useState(0);
    const position = new Animated.ValueXY();
    const panResopnder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, { dx, dy }) => {
            position.setValue({x: dx, y: dy})
        },
        onPanResponderRelease: (evt, { dx, dy }) => {
            if(dx >= WIDTH / 2){
                Animated.spring(position, {
                    toValue: {
                        x: WIDTH + WIDTH / 2,
                        y: dy
                    },
                    useNativeDriver: true,
                }).start(nextCard);
            }else if(dx <= -WIDTH / 2){
                Animated.spring(position, {
                    toValue: {
                        x: -WIDTH - WIDTH / 2,
                        y: dy
                    },
                    useNativeDriver: true,
                }).start(nextCard);
            }else{
                Animated.spring(position, {
                    toValue: {
                        x: 0,
                        y: 0
                    },
                    useNativeDriver: true,
                    // bounciness: 10
                }).start();
            }
        }
    })

    const nextCard = () => setTopIndex(currentValue => currentValue + 1);
    
    const rotationValue = position.x.interpolate({
        inputRange: [-WIDTH / 2, 0, HEIGHT / 2],
        outputRange: ['-8deg', '0deg', '8deg'],
        extrapolate: 'clamp'
    });

    const fadeValue = position.x.interpolate({
        inputRange: [-WIDTH / 2, 0, HEIGHT / 2],
        outputRange: [0.8, 1, 0.8],
        extrapolate: 'clamp'
    });

    const secondCardOpacity = position.x.interpolate({
        inputRange: [-WIDTH / 2, 0, HEIGHT / 2],
        outputRange: [1, 0.1, 1],
        extrapolate: 'clamp'
    });

    const secondCardScale = position.x.interpolate({
        inputRange: [-WIDTH / 2, 0, HEIGHT / 2],
        outputRange: [1, 0.8, 1],
        extrapolate: 'clamp'
    })
    
    return(
        <Container>
            {results.map((result, index) => {
                if(index < topIndex){
                    return null
                }else if(index === topIndex){
                    return(
                        <Animated.View
                            key={result.id}
                            {...panResopnder.panHandlers}
                            style={{
                                ...styles,
                                zIndex:1,
                                opacity: fadeValue,
                                transform: [{rotate: rotationValue}, ...position.getTranslateTransform()]
                            }}
                        >
                            <Poster
                                source={{uri: apiImageHigh(result.poster_path)}}
                            />
                        </Animated.View>
                    )
                } else if( index === topIndex + 1){
                    return(
                        <Animated.View
                            key={result.id}
                            {...panResopnder.panHandlers}
                            style={{
                                ...styles,
                                zIndex: -index,
                                opacity: secondCardOpacity,
                                transform: [
                                    {scale: secondCardScale}
                                ]
                            }}
                        >
                            <Poster
                                source={{uri: apiImageHigh(result.poster_path)}}
                            />
                        </Animated.View>
                    )
                }else{
                    return(
                        <Animated.View
                            key={result.id}
                            {...panResopnder.panHandlers}
                            style={{
                                ...styles,
                                zIndex: -index,
                                opacity: 0
                            }}
                        >
                            <Poster
                                source={{uri: apiImageHigh(result.poster_path)}}
                            />
                        </Animated.View>
                    )
                }
            })}
        </Container>
    )
}