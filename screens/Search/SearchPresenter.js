import React from 'react';
import styled from 'styled-components/native';
import Input from '../../components/Search/Input';
import HorizontalSlider from '../../components/HorizontalSlider';
import Vertical from '../../components/Vertical';
import ScrollContainer from '../../components/ScrollContainer';

const Container = styled.ScrollView`
    background-color: #222;
`;

export default ({ movies, shows , keyword, onChange, onSubmit }) => {
    return(
        <ScrollContainer
            refreshFn={onSubmit}
            loading={false}
            contentContainerStyle={{marginTop: 20}}
        >
            <Input
                placeholder={'Write a keyword'}
                value={keyword}
                onChange={onChange}
                onSubmit={onSubmit}
            />
            {movies.length !== 0 && (
                <HorizontalSlider title={"Movie results"}>
                    {movies.map(movie => 
                        <Vertical
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            poster={movie.poster_path}
                            votes={movie.vote_average}
                            overview={movie.overview}
                            backgroundImage={movie.backdrop_path}
                        />)}
                </HorizontalSlider>
            )}
            {shows.length !== 0 && (
                <HorizontalSlider title={"TV results"}>
                    {shows.map(show => 
                        <Vertical
                            isTv={true}
                            key={show.id}
                            id={show.id}
                            title={show.name}
                            poster={show.poster_path}
                            votes={show.vote_average}
                            overview={show.overview}
                            backgroundImage={show.backdrop_path}
                        />)}
                </HorizontalSlider>
            )}
        </ScrollContainer>
    )
}