import * as actionTypes from '../actions/actionTypes';
import update from 'immutability-helper';
// import _ from 'lodash';
import moment from 'moment';

const initialState = {
  current: null,
  temp5Days: null,
  humidity5Days: null,
  loading: false,
};

const fix = (value) => Math.round(value);
const fixDate = (date, dateFormat) => moment(date).format(dateFormat);
const getDay = date => date.getDay();

const reduceValuesToInRowOccurencesTimes = (data) => {
  const inRowOccurencesTimes = [];

  let valueIndex = -1;
  let prevValue = null;

  data.forEach(value => {
    if (value === prevValue) {
      inRowOccurencesTimes[valueIndex] += 1;
    }
    else {
      inRowOccurencesTimes.push(1);
      prevValue = value;
      valueIndex++;
    }
  });

  return inRowOccurencesTimes;
}

const splitArrayByIndexes = (arr, indexes) => {
  let startIndex = 0;
  let endIndex = 0;
  const arrIndexes = [...indexes];

  arrIndexes.unshift(startIndex);
  const splittedArray = [];

  for (let i = 1; i < arrIndexes.length; i++) {
    startIndex += arrIndexes[i - 1];
    endIndex = (startIndex + arrIndexes[i]);
    splittedArray.push(arr.slice(startIndex, endIndex));
  }

  return splittedArray;
}

const fillArrayEmptySpaces = arr => {
  // const daysNum = arr.length;
  const dailyMesurementsNum = arr[1].length;
  const firstDayMesurementsNum = arr[0].length;
  // const lastDayMesurementsNum = arr[daysNum - 1].length;

  const filledFirstDayMeasurements = [...arr[0], ...arr[1].slice(0, dailyMesurementsNum - firstDayMesurementsNum)];

  const newArr = [...arr];
  newArr[0] = filledFirstDayMeasurements;
  return newArr;
}

const weather = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WEATHER: {
      return {
        ...state,
        current: null,
        temp5Days: null,
        humidity5Days: null,
        loading: true
      }
    }

    case actionTypes.GET_WEATHER_DONE: {
      const data = action.payload.data;
      const firstMeasurementData = data.list[0];

      const dateFormat = 'dddd, DD.MM';
      const timeFormat = 'HH:mm';

      const temp5Days = {
        temps: [],
        temps_min: [],
        temps_max: [],
        days: [],
        times: []
      };
      const humidity5Days = {
        humidities: [],
        days: [],
        times: []
      };

      const currentWeatherData = {
        humidity: fix(firstMeasurementData.main.humidity),
        pressure: fix(firstMeasurementData.main.pressure),
        temperature: fix(firstMeasurementData.main.temp),
        windDeg: fix(firstMeasurementData.wind.deg),
        windSpeed: fix(firstMeasurementData.wind.speed),
        description: firstMeasurementData.weather[0].description,
        date: fixDate(firstMeasurementData.dt*1000, dateFormat),
        time: fixDate(firstMeasurementData.dt*1000, timeFormat),
        icon: firstMeasurementData.weather[0].icon,
      }

      const measurementsDays = [];
      data.list.forEach(measurementData => {
        const date = new Date(measurementData.dt*1000);
        const value = getDay(date);
        measurementsDays.push(value);
      });

      const measurementsCount = reduceValuesToInRowOccurencesTimes(measurementsDays);

      data.list.forEach(measurementData => {
        const measurementDate = measurementData.dt*1000;

        temp5Days.temps.push(fix(measurementData.main.temp));
        temp5Days.temps_min.push(fix(measurementData.main.temp_min));
        temp5Days.temps_max.push(fix(measurementData.main.temp_max));
        temp5Days.days.push(fixDate(measurementDate, dateFormat));
        temp5Days.times.push(fixDate(measurementDate, timeFormat));

        humidity5Days.humidities.push(fix(measurementData.main.humidity));
        humidity5Days.days.push(fixDate(measurementDate, dateFormat));
        humidity5Days.times.push(fixDate(measurementDate, timeFormat));
      });

      const temp5DaysSplitted = {
        temps: splitArrayByIndexes(temp5Days.temps, measurementsCount),
        temps_min: splitArrayByIndexes(temp5Days.temps_min, measurementsCount),
        temps_max: splitArrayByIndexes(temp5Days.temps_max, measurementsCount),
        days: splitArrayByIndexes(temp5Days.days, measurementsCount).map(days => {
          return days[0];
        }),
        times: splitArrayByIndexes(temp5Days.times, measurementsCount),
      };

      const humidity5DaysSplitted = {
        humidities: splitArrayByIndexes(humidity5Days.humidities, measurementsCount),
        days: splitArrayByIndexes(humidity5Days.days, measurementsCount).map(days => {
          return days[0];
        }),
        times: splitArrayByIndexes(humidity5Days.times, measurementsCount),
      };

      const temp5DaysFilled = {
        temps: fillArrayEmptySpaces(temp5DaysSplitted.temps),
        temps_min: fillArrayEmptySpaces(temp5DaysSplitted.temps_min),
        temps_max: fillArrayEmptySpaces(temp5DaysSplitted.temps_max),
        days: temp5DaysSplitted.days,
        times: fillArrayEmptySpaces(temp5DaysSplitted.times),
      };

      const humidity5DaysFilled = {
        humidities: fillArrayEmptySpaces(humidity5DaysSplitted.humidities),
        days: humidity5DaysSplitted.days,
        times: fillArrayEmptySpaces(humidity5DaysSplitted.times),
      };

      return update(state, {
        current: {$set: currentWeatherData},
        temp5Days: {$set: temp5DaysFilled},
        humidity5Days: {$set: humidity5DaysFilled},
        loading: {$set: false},
      });
    }
    case actionTypes.GET_WEATHER_FAIL: {
      return {
        ...state,
        current: null,
        temp5Days: null,
        humidity5Days: null,
        loading: false
      }
    }
    default: {
      return state;
    }
  }
};

export default weather;
