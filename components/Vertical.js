import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { apiImage } from '../API';
import Votes from './Votes';
import Poster from './Poster';
import { TouchableOpacity } from 'react-native';
import { trimText } from '../util';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
    align-items: center;
    margin-right: 20px;
`;

const Title = styled.Text`
    color: #eee;
    margin: 10px 0 5px 0;
    font-size: 12px;
`;

const Vertical = ({ isTv = false, id, poster, title, votes, backgroundImage, overview }) => {
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate('Detail', {
            isTv, id, title, poster, votes, backgroundImage, overview
        });
    }
    return(
        <TouchableOpacity
            onPress={goToDetail}
        >
            <Container>
                <Poster url={apiImage(poster)} />
                <Title>{trimText(title, 12)}</Title>
                <Votes votes={votes} />
            </Container>
        </TouchableOpacity>
    )
}

Vertical.propTypes = {
    id: PropTypes.number.isRequired,
    poster: PropTypes.string,
    title: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired
}

export default Vertical;