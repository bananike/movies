import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform } from 'react-native';

const CheckOS = Platform.OS !== ('ios' || 'android') ? {
    webOutline: `
        outline-width: 0;
    `
}:{}

const TextInput = styled.TextInput`
    background-color: #eee;
    margin: 0px 30px 50px;
    padding: 15px 25px;
    border-radius: 30px;
    ${CheckOS.webOutline}
`;

const Input = ({ placeholder, value, onChange, onSubmit }) => {
    return(
        <TextInput
            placeholder={placeholder}
            returnKeyType={'search'}
            autoCorrect={false}
            value={value}
            onChangeText={onChange}
            onSubmitEditing={onSubmit}
        />
    )
}

Input.propTypes = {
    placeholder: PropTypes.string.isRequired, 
    value: PropTypes.string.isRequired, 
    onChange: PropTypes.func.isRequired, 
    onSubmit: PropTypes.func.isRequired
}


export default Input;