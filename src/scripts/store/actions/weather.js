/*eslint no-unused-vars:0*/

import * as actionTypes from './actionTypes';
import axios from 'axios';
// import _tempData from '../data/_tempData';

export const getWeatherStart = () => {
  return {
    type: actionTypes.GET_WEATHER,
  }
}

export const getWeatherDone = (data) => {
  return {
    type: actionTypes.GET_WEATHER_DONE,
    payload: { data }
  }
}

export const getWeatherFail = () => {
  return {
    type: actionTypes.GET_WEATHER_FAIL
  }
}

export const getWeather = (query) => {
  return dispatch => {
    const url = 'http://api.openweathermap.org/data/2.5/forecast';
    const params = {
      q: query,
      mode: 'json',
      appid: '666ebde065d4e9f8a9a3f284526c910c',
      units: 'metric'
    };

    dispatch(getWeatherStart());

    axios.get(url, {params})
    .then(response => {
      dispatch(getWeatherDone(response.data));
    })
    .catch(function () {
      dispatch(getWeatherFail());
    });

    // dispatch(getWeatherDone(_tempData));
  }
}
