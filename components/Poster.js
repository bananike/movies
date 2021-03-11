import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Image = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 3px;
`;

const Poster = ({url}) => {
    return(
        <Image
            source={{uri: url}}
        />
    )
}

Poster.propType= {
    url: PropTypes.string
}

export default Poster;