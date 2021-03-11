import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Slide from '../../components/Movies/Slide';
import Vertical from '../../components/Vertical';
import Horizontal from '../../components/Horizontal';
import ScrollContainer from '../../components/ScrollContainer';
import HorizontalSlider from '../../components/HorizontalSlider';
import List from '../../components/List';
import Carousel from '../../components/Carousel';

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

export default ({ refreshFn, loading, nowPlaying, popular, upcoming }) => {
    return(
        <ScrollContainer loading={loading} refreshFn={refreshFn}>
            <>
                <SliderContainer>
                    <Carousel>
                        {nowPlaying.map(movie => (
                            <Slide
                                key={movie.id}
                                id={movie.id}
                                title={movie.original_title}
                                overview={movie.overview}
                                votes={movie.vote_average}
                                backgroundImage={movie.backdrop_path}
                                poster={movie.poster_path}
                            />
                        ))}
                    </Carousel>
                </SliderContainer>
                <Container>
                    <HorizontalSlider title={'Popular Movies'}>
                        {popular.map(movie => (
                            <Vertical
                                key={movie.id}
                                id={movie.id}
                                poster={movie.poster_path}
                                title={movie.title}
                                votes={movie.vote_average}
                                overview={movie.overview}
                                backgroundImage={movie.backdrop_path}
                            />
                        ))}
                    </HorizontalSlider>
                    <List title={'Coming Soon'}>
                        <ResponseRow>
                            {upcoming.map(movie => (
                                <Horizontal
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.original_title}
                                    releaseDate={movie.release_date}
                                    poster={movie.poster_path}
                                    overview={movie.overview}
                                    backgroundImage={movie.backdrop_path}
                                />
                            ))}
                        </ResponseRow>
                    </List>
                </Container>
            </>
        </ScrollContainer>
    )
}