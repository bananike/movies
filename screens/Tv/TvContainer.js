import React, { useEffect, useState } from 'react';
import { tvApi } from '../../API';
import TvPresenter from './TvPresenter';

export default () => {
    const [shows, setShows] = useState({
        loading: true,
        popular: [],
        popularError: null,
        thisWeek: [],
        thisWeekError: null,
        topRated: [],
        topRatedError: null,
        today: [],
        todayError: null,
    })
    const getData = async() => {
        const [popular, popularError] = await tvApi.popular();
        const [thisWeek, thisWeekError] = await tvApi.thisWeek();
        const [topRated, topRatedError] = await tvApi.topRated();
        const [today, todayError] = await tvApi.today();
        setShows({
            ladong: false,
            popular,
            popularError,
            thisWeek,
            thisWeekError,
            topRated,
            topRatedError,
            today,
            todayError
        })
    }
    useEffect(() => {
        getData()
    }, [])
    return(
        <TvPresenter
            refreshFn={getData}
            {...shows}
        />
    )
}