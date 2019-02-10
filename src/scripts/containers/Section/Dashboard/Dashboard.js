import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from 'react-aux';
import _ from 'lodash';

import PropTypes from 'prop-types';

import { Select, Loader } from 'semantic-ui-react';

import * as actions from '../../../store/actions';
import { CityContext } from '../../../store/context/context';
import { updatePageTitle } from '../../../other/utils.js';

import ErrorLoading from '../../../components/Section/Dashboard/ErrorLoading/ErrorLoading';
import Tiles from '../../../components/Section/Dashboard/Tiles/Tiles';
import Temperature from '../../../components/Section/Dashboard/Charts/Temperature/Temperature';
import Humidity from '../../../components/Section/Dashboard/Charts/Humidity/Humidity';

const citiesOptions = [
  {
    text: 'Kraków, POL',
    value: 'Kraków,pl',
  },
  {
    text: 'Tarnów, POL',
    value: 'Tarnów,pl',
  },
  {
    text: 'Warszawa, POL',
    value: 'Warszawa,pl',
  },
  {
    text: 'New York, USA',
    value: 'New York,us',
  },
  {
    text: 'London, UK',
    value: 'London,uk',
  },
  {
    text: 'Paris, FRA',
    value: 'Paris,fr',
  },
  {
    text: 'Melbourne, AUS',
    value: 'Melbourne,au',
  },
  {
    text: 'Yakutsk, RUS',
    value: 'Yakutsk,ru',
  }
];

const citiesValueMap = _.keyBy(citiesOptions, 'value');

class Dashboard extends Component {
  static contextTypes = {
    cityDesc: PropTypes.string,
    cityValue: PropTypes.string
  };

  componentDidMount() {
    updatePageTitle('Dashboard');
    this.props.getWeather(this.context.cityValue);
  }

  onCityChange = (cityValue, changeCity) => {
    const cityDesc = citiesValueMap[cityValue].text;
    changeCity(cityDesc, cityValue);
    this.props.getWeather(cityValue);
  }

  render() {

    const showWeather = !this.props.loading && !!this.props.current;

    return (
      <div className="dashboard container">

        <CityContext.Consumer>
          {({cityValue, changeCity}) => {
            return (
              <Select
                className="dashboard__select"
                placeholder='Select city'
                options={citiesOptions}
                defaultValue={cityValue}
                onChange={(e, data) => this.onCityChange(data.value, changeCity)} />
            );
          }}
        </CityContext.Consumer>

        <h2 className="dashboard__title">
          <CityContext.Consumer>
          {({cityDesc}) => cityDesc}
          </CityContext.Consumer>
        </h2>

        <div className="dashboard__tiles">
          {showWeather ? <Tiles weatherData={this.props.current}/> : this.props.loading ? <Loader active/> : <ErrorLoading /> }
        </div>

        <div className="dashboard__charts">
          {showWeather ? (
            <Aux>
              <Temperature data={this.props.temp5Days}/>
              <Humidity data={this.props.humidity5Days}/>
            </Aux>
          ) : null }
        </div>

      </div>
    );
  }
}

Dashboard.propTypes = {
  getWeather: PropTypes.func,
  current: PropTypes.object,
  temp5Days: PropTypes.object,
  humidity5Days: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    current: state.weather.current,
    temp5Days: state.weather.temp5Days,
    humidity5Days: state.weather.humidity5Days,
    loading: state.weather.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getWeather: (city) => dispatch(actions.getWeather(city)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
