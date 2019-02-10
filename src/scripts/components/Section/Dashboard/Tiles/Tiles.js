import React from 'react';
import Aux from 'react-aux';

import PropTypes from 'prop-types';

import icons from '../../../../other/icons';

const tiles = (props) => {
  return (
    <Aux>
      <div className="tile tile--big">
        <span className="tile__value">{props.weatherData.temperature}&deg;C</span>
        <span className="tile__description">temperature</span>
      </div>
      <div className="tile tile--big">
        <img className="tile__icon-weather"src={icons[props.weatherData.icon]} />
        <span className="tile__description">{props.weatherData.description}</span>
      </div>

      <div className="dashboard__tiles--secondary">
        <div className="tile">
          <span className="tile__value">{props.weatherData.humidity}%</span>
          <span className="tile__description">humidity</span>
        </div>
        <div className="tile">
          <span className="tile__value">{props.weatherData.pressure}hPa</span>
          <span className="tile__description">pressure</span>
        </div>
        <div className="tile">
          <span className="tile__value">
            <i className="fas fa-long-arrow-alt-up tile__arrow" style={{
                transform: `rotate(${props.weatherData.windDeg}deg)`
            }}></i>
            <span className="h__m-l--xs">{props.weatherData.windSpeed}m/s</span>
          </span>
          <span className="tile__description">wind speed</span>
        </div>
      </div>

    </Aux>
  );
}

tiles.propTypes = {
  weatherData: PropTypes.object,
};

export default tiles;
