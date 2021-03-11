import React, { useEffect, useState } from 'react';
import { movieApi } from '../../API';
import MoviesPresenter from './MoviesPresenter';

export default () => {
    const [refreshing, setRefreshing] = useState(false);
    const [movies, setMovies] = useState({
        loading: true,
        nowPlaying: [],
        nowPlayingError: null,
        popular: [],
        popularError: null,
        upcoming: [],
        upcomingError: null,
    })
    const getData = async() => {
        const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
        const [popular, popularError] = await movieApi.popular();
        const [upcoming, upcomingError] = await movieApi.upcoming();
        setMovies({
            loadng: false,
            nowPlaying,
            nowPlayingError,
            popular,
            popularError,
            upcoming,
            upcomingError
        })
    }
    useEffect(() => {
        getData()
    }, [])

    return(
        <MoviesPresenter
            refreshFn={getData}
            {...movies}
        />
    )
}