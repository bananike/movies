import React, { useState, useEffect } from 'react';
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import styled from 'styled-components/native';

const Btn = ({
    title = null,
    icon = null,
    iconType = null,
    onPress = () => null,
    height = 'auto', 
    width = 'auto', 
    backgroundColor = '#eee', 
    padding = '10px 5px', 
    margin = '10px', 
    borderRadius = '3px', 
    color = '#222', 
    fontSize = '14px', 
    fontWeight = '600', 
    textAlign = 'center',
    justifyContent = 'center'

}) => {
    const [typeName, setTypeName] = useState(null);

    const View = styled.View`
        height: ${height};
        width: ${width};
    `;

    const TouchableOpacity = styled.TouchableOpacity`
        background-color: ${backgroundColor};
        padding: ${padding};
        margin: ${margin};
        border-radius: ${borderRadius};
        justify-content: ${justifyContent};
        flex-direction: row;
        align-items: center;
    `;

    const Text = styled.Text`
        color: ${color};
        font-size: ${fontSize};
        font-weight: ${fontWeight};
        text-align: ${textAlign};
    `;

    useEffect(() => {
        if(iconType === 'FontAwesome'){
            setTypeName(
                <FontAwesome
                    name={icon}
                    color={color}
                    size={parseInt(fontSize.split('px')[0]) * 1.2}
                    style={{marginRight: 7}}
                />
            );
        }else if(iconType === 'Ionicons'){
            setTypeName(
                <Ionicons
                    name={icon}
                    color={color}
                    size={parseInt(fontSize.split('px')[0]) * 1.2}
                    style={{marginRight: 7}}
                />
            );
        }else if(iconType === 'Entypo'){
            setTypeName(
                <Entypo
                    name={icon}
                    color={color}
                    size={fontSize.split('px')[0] * 1.2}
                    style={{marginRight: 7}}
                />
            );
        }
    }, [])
    return(
        <View>
            <TouchableOpacity
                onPress={onPress}
            >
                {icon !== null ? typeName : null}
                {title !== null ? <Text>{title}</Text> : null}
            </TouchableOpacity>
        </View>
    )
}

export default Btn;