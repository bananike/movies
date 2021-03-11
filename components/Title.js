import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Text = styled.Text`
    color: #eee;
    font-weight: 100;
    font-size: 18px;
    margin-left: 40px;
`;

const Title = ({title}) => {
    return(
        <Text>{title}</Text>
    )
}

Title.propTypes = {
    title: PropTypes.string.isRequired
}

export default Title;