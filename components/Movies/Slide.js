import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { apiImage, apiImageHigh } from '../../API';
import Poster from '../Poster';
import Btn from '../../Btn';
import Votes from '../Votes';
import { Dimensions } from 'react-native';
import { trimText } from '../../util';
import { useNavigation } from '@react-navigation/native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const mediaQuery = WIDTH < 768 ? {
    slideAlign: `
        justify-content: space-evenly;
        padding: 0px;
    `,
    marginLeft: `
        margin-left: 0px;
    `,
    contentWidth: `
        width: 50%;
    `,
    titleLimit: 30,
    overviewLimit: 90
}:{
    titleLimit: 80,
    overviewLimit: 300
};

const Container = styled.View`
    width: 100%;
    height: 100%;
`;

const BG = styled.Image`
    height: 100%;
    width: 100%;
    opacity: 0.3;
    position: absolute;
`;

const Content = styled.View`
    flex-direction: row;
    align-items: center;
    height: 100%;
    justify-content: flex-start;
    padding: 40px;
    ${mediaQuery.slideAlign}
`;

const Data = styled.View`
    width: calc(100% - 100px);
    margin-left: 20px;
    ${mediaQuery.marginLeft}
    ${mediaQuery.contentWidth}
`;

const Title = styled.Text`
    color: #fff;
    font-weight: 100;
    font-size: 24px;
    margin-bottom: 10px;
`;

const VotesContainer = styled.View`
    margin-bottom: 5px;
`;

const Overview = styled.Text`
    color: #ccc;
    margin-bottom: 10px;
`;

const Slide = ({ isTv = false, id, title, backgroundImage, votes, overview, poster }) => {
    const navigation = useNavigation();
    const goToDetail = () => navigation.navigate('Detail',{
        isTv, id, title, backgroundImage, votes, overview, poster
    })
    return(
        <Container>
            <BG
                source={{uri: apiImageHigh(backgroundImage)}}
            />
            <Content>
                <Poster
                    url={apiImage(poster)}
                />
                <Data>
                    <Title>{trimText(title, mediaQuery.titleLimit)}</Title>
                    <VotesContainer>
                        <Votes votes={votes} />
                    </VotesContainer>
                    <Overview>{trimText(overview, mediaQuery.overviewLimit)}</Overview>
                    <Btn
                        title="View more"
                        backgroundColor='rgba(0,0,0,0.5)'
                        color="#aaa"
                        margin="0px"
                        padding="10px"
                        width='120px'
                        icon='popup'
                        iconType='Entypo'
                        onPress={goToDetail}
                    />
                </Data>
            </Content>
        </Container>
    )
}

Slide.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
}

export default Slide;