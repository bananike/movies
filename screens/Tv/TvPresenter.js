import React from 'react';
import ScrollContainer from '../../components/ScrollContainer';
import Vertical from '../../components/Vertical';
import HorizontalSlider from '../../components/HorizontalSlider';
import styled from 'styled-components/native';
import List from '../../components/List';
import Horizontal from '../../components/Horizontal';
import { Dimensions } from 'react-native';
import Carousel from '../../components/Carousel';
import Slide from '../../components/Movies/Slide';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const mediaQuery = WIDTH < 768 ? {
    direction: `
        flex-direction: column;
    `,
}:{
};
const SliderContainer = styled.View`
    width: 100%;
    height: ${HEIGHT / 4}px;
    margin-bottom: 40px;
`;

const Container = styled.View``;

const ResponseRow = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
    ${mediaQuery.direction}
`;

export default ({ refreshFn, loading, popular, topRated, today, thisWeek }) => {
    return (
        <ScrollContainer refreshFn={refreshFn} loading={loading}>
            <SliderContainer>
                <Carousel>
                    {thisWeek.map(show => (
                        <Slide
                            isTv={true}
                            key={show.id}
                            id={show.id}
                            title={show.original_name}
                            overview={show.overview}
                            votes={show.vote_average}
                            backgroundImage={show.backdrop_path}
                            poster={show.poster_path}
                        />
                    ))}
                </Carousel>
            </SliderContainer>
            <Container>
                <HorizontalSlider title={'Popular Shows'}>
                    {popular.map(show => (
                            <Vertical
                                isTv={true}
                                key={show.id}
                                id={show.id}
                                poster={show.poster_path}
                                title={show.name}
                                votes={show.vote_average}
                                backgroundImage={show.backdrop_path}
                                overview={show.overview}
                            />
                        ))}
                </HorizontalSlider>
                <HorizontalSlider title={'Top Rated'}>
                    {topRated.map(show => (
                        <Vertical
                            isTv={true}
                            key={show.id}
                            id={show.id}
                            poster={show.poster_path}
                            title={show.name}
                            votes={show.vote_average}
                            backgroundImage={show.backdrop_path}
                            overview={show.overview}
                        />
                    ))}
                </HorizontalSlider>
                <List title="Airing Today">
                    <ResponseRow>
                        {today.map(show => (
                            <Horizontal
                                isTv={true}
                                key={show.id}
                                id={show.id}
                                poster={show.poster_path}
                                title={show.name}
                                votes={show.vote_average}
                                overview={show.overview}
                                backgroundImage={show.backdrop_path}
                            />
                        ))}
                    </ResponseRow>
                </List>
            </Container>
        </ScrollContainer>
    )
}