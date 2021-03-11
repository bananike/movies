import axios from 'axios';

const TMBD_KET = '63dfc4e144c1314072cce955bed7e71e';

const makeRequest = (path, params) => {
    return(
        axios.get(`https://api.themoviedb.org/3${path}`, {
            params: {
            ...params,
            api_key: TMBD_KET
        }})
    )
}

const getAnything = async(path, params = {}) => {
    try{
        const {
            data: {results},
            data
        } = await makeRequest(path, params);
        return [results || data, null];
    }catch(e){
        return [null, e];
    }
}

export const movieApi = {
    nowPlaying: () => getAnything('/movie/now_playing'),
    popular: () => getAnything('/movie/popular'),
    upcoming: () => getAnything('/movie/upcoming', {region: 'kr'}),
    search: (query) => getAnything('/search/movie', {query}),
    movie: (id) => getAnything(`/movie/${id}`, {append_to_response: 'videos'}),
    discover: () => getAnything('/discover/movie'),
}
export const tvApi = {
    today: () => getAnything('/tv/airing_today'),
    thisWeek: () => getAnything('/tv/on_the_air'),
    topRated: () => getAnything('/tv/top_rated'),
    popular: () => getAnything('/tv/popular'),
    search: (query) => getAnything('/search/tv', {query}),
    show: (id) => getAnything(`/tv/${id}`, {append_to_response: 'videos'}),
}

const defaultImage = 'https://images.unsplash.com/photo-1497514440240-3b870f7341f0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=881&q=80';

export const apiImage = (
    path, 
    defaultPoster = defaultImage
) => (path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : defaultPoster)

export const apiImageHigh = (
    path, 
    defaultPoster = defaultImage
) => (path
    ? `https://image.tmdb.org/t/p/original${path}`
    : defaultPoster)