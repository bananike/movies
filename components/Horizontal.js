import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { apiImage } from '../API';
import Poster from './Poster';
import { Dimensions, Platform, TouchableOpacity } from 'react-native';
import { trimText, formatDate } from '../util';
import { useNavigation } from '@react-navigation/native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const platformIOS = Platform.OS === 'ios' ? {
    dataWidth: `
        width: 100%;
    `,
    touchWidth: `
        width: 50%;
    `,
}:{
};

const Container = styled.View`
    align-items: center;
    margin-right: 20px;
    padding: 0px 40px;
    margin-bottom: 20px;
    flex-direction: row;
    align-items: flex-start;
`;

const Data = styled.View`
    position: relative;
    margin-left: 20px;
    width: calc(100% - 40px);
    padding-right: 50px;
    ${platformIOS.dataWidth}
`;

const Title = styled.Text`
    color: #eee;
    margin: 10px 0 10px 0;
    font-size: 16px;
    font-weight: bold;
`;

const Overview = styled.Text`
    color: #eee;
    margin-top: 5px;
`;

const ReleaseDate = styled.Text`
    color: #999;
    font-size: 12px;
`;

const Horizontal = ({ isTv = false, id, title, poster, overview, releaseDate, backgroundImage }) => {
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate('Detail', {
            isTv, id, title, poster, overview, releaseDate, backgroundImage
        });
    }
    return(
        <TouchableOpacity
            onPress={goToDetail}
            style={WIDTH > 768 ?{width: '50%'}:{width: '100%'}}
        >
            <Container>
                <Poster url={apiImage(poster)} />
                <Data>
                    <Title>{trimText(title, 30)}</Title>
                    {releaseDate ? 
                        <ReleaseDate>{formatDate(releaseDate)} Upcoming!</ReleaseDate>
                    :null}
                    <Overview>{trimText(overview, 130)}</Overview>
                </Data>
            </Container>
        </TouchableOpacity>
    )
}

Horizontal.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    releaseDate: PropTypes.string,
}

export default Horizontal;