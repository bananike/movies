import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import ScrollContainer from '../../components/ScrollContainer';
import { apiImageHigh, apiImage } from '../../API';
import { Dimensions, ActivityIndicator, Platform } from 'react-native';
import Poster from '../../components/Poster';
import Votes from '../../components/Votes';
import { formatDate } from '../../util';
import Btn from '../../Btn';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const mediaQuery = WIDTH < 768 ? {
    infoWidth: `
        width: 80%;
        margin-left: 20px;
    `,
    containerAlign: `
        justify-content: space-between;
    `,
    headerHeight: `
        height: ${(HEIGHT / 3) + 50}px;
    `,
}:{
};

const platformIOS = Platform.OS === 'ios' ? {
    containerWidth: `
        width: 80%;
    `,
}:{
};

const BG = styled.Image`
    width: 100%;
    height: 100%;
    opacity: 0.25;
    position: absolute;
`;

const Header = styled.View`
    height: ${HEIGHT / 3}px;
    align-items: center;
    justify-content: flex-end;
    ${mediaQuery.headerHeight}
`;

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    top: 30px;
    width: calc(100% - 60px);
    justify-content: center;
    ${mediaQuery.containerAlign}
    ${platformIOS.containerWidth}
`;
const Info = styled.View`
    margin-left: 40px;
    ${mediaQuery.infoWidth}
`;
const Title = styled.Text`
    color: #eee;
    font-weight: 100;
    font-size: 24px;
    margin-bottom: 10px;
`;
const Data = styled.View`
    padding: 0px 30px 20px;
    margin-top: 30px;
`;
const DataName = styled.Text`
    color: #eee;
    font-weight: 800;
    margin-bottom: 10px;
    margin-top: 20px;
`;
const DataValue = styled.Text`
    color: #aaa;
    text-align: left;
`;
const BtnContainer = styled.Text`
`;

export default ({ result, loading, openBrowser }) => {
    return(
        <ScrollContainer loading={false}>
            <>
                <Header>
                    <BG
                        source={{uri: apiImageHigh(result.backgroundImage, '-')}}
                    />
                    <Container>
                        <Poster
                            url={apiImage(result.poster)}
                        />
                        <Info>
                            <Title>{result.title}</Title>
                            {result.votes > 0 ? <Votes votes={result.votes} />:null}
                        </Info>
                    </Container>
                </Header>
                <Data>
                    {result.overview ? (
                        <>
                            <DataName>Overview</DataName>
                            <DataValue>{result.overview}</DataValue>
                        </>
                    ):null}
                    {loading ? (
                    <ActivityIndicator
                        style={{marginTop: 30}}
                        color='#fff'
                        size='large'
                    />):null}
                    {result.spoken_languages ? (
                        <>
                            <DataName>Language</DataName>
                            <DataValue>
                                {result.spoken_languages.map((l, index) => l.name === '' ? null : (index + 1 === result.spoken_languages.length ? l.name : `${l.name}, `))}
                            </DataValue>
                        </>   
                    ):null}
                    {result.genres ? (
                        <>
                            <DataName>Genres</DataName>
                            <DataValue>
                                {result.genres.map((g, index) => index + 1 === result.genres.length ? g.name : `${g.name}, `)}
                            </DataValue>
                        </>   
                    ):null}
                    {result.release_date ? (
                        <>
                            <DataName>Release Date</DataName>
                            <DataValue>
                                {formatDate(result.release_date)}
                            </DataValue>
                        </>   
                    ):null}
                    {result.first_air_date ? (
                        <>
                            <DataName>First Air Date</DataName>
                            <DataValue>{formatDate(result.first_air_date)}</DataValue>
                        </>
                    ):null}
                    {result.status ? (
                        <>
                            <DataName>Status</DataName>
                            <DataValue>{result.status}</DataValue>
                        </>
                    ):null}
                    {result.runtime ? (
                        <>
                            <DataName>Runtime</DataName>
                            <DataValue>{result.runtime} min.</DataValue>
                        </>
                    ):null}
                    {result.number_of_episodes ? (
                        <>
                            <DataName>Seasons & Episodes</DataName>
                            <DataValue>Season {result.number_of_seasons} and Episode total {result.number_of_episodes}</DataValue>
                        </>
                    ):null}
                    <>
                        <DataName>Links</DataName>
                        {result.videos.results?.length > 0 ? (
                            <BtnContainer>
                                {result.videos.results.map(video =>(
                                    <Btn
                                        title={video.name}
                                        key={video.id}
                                        backgroundColor='transparent'
                                        color="#aaa"
                                        margin="0px"
                                        padding="5px 0px"
                                        width='100%'
                                        justifyContent='flex-start'
                                        icon='youtube'
                                        iconType='Entypo'
                                        onPress={() => openBrowser(`https://www.youtube.com/watch?v=${video.id}`)}
                                    />
                                ))}
                            </BtnContainer>
                        ):null}
                        {result.imdb_id ? (
                            <BtnContainer style={{marginTop: 5}}>
                                <Btn
                                    title="Open IMDB Page"
                                    backgroundColor='transparent'
                                    color="#aaa"
                                    margin="0px"
                                    padding="5px 0px"
                                    width='100%'
                                    justifyContent='flex-start'
                                    icon='imdb'
                                    iconType='FontAwesome'
                                    onPress={() => openBrowser(`https://www.imdb.com/title/${result.imdb_id}`)}
                                />
                            </BtnContainer>
                        ):null}
                    </>
                </Data>
            </>
        </ScrollContainer>
    )
}