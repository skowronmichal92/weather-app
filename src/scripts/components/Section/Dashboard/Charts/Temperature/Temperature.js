import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ChartJS from 'react-chartjs';

import _ from 'lodash';

import { Button, Checkbox } from 'semantic-ui-react';

const LineChart = ChartJS.Line;

const chartColors = {
  minTemp: {
    stroke: '#ADD8E6',
    pointCircumference: '#fff'
  },
  temp: {
    stroke: '#90EE90',
    pointCircumference: '#fff'
  },
  maxTemp: {
    stroke: '#FA8072',
    pointCircumference: '#fff'
  }
}

class Temperature extends Component {

  state = {
    activeDay: 0,
    activeSeries: ['min temperature', 'temperature', 'max temperature']
  }

  getData(index) {

    const dataSets = [
      {
        label: "min temperature",
        strokeColor: chartColors.minTemp.stroke,
        pointColor: chartColors.minTemp.stroke,
        pointStrokeColor: chartColors.minTemp.pointCircumference,
        data: this.props.data.temps_min[index]
      },
      {
        label: "temperature",
        strokeColor: chartColors.temp.stroke,
        pointColor: chartColors.temp.stroke,
        pointStrokeColor: chartColors.temp.pointCircumference,
        data: this.props.data.temps[index]
      },
      {
        label: "max temperature",
        strokeColor: chartColors.maxTemp.stroke,
        pointColor: chartColors.maxTemp.stroke,
        pointStrokeColor: chartColors.maxTemp.pointCircumference,
        data: this.props.data.temps_max[index]
      }
    ];

    const filteredSets = _.filter([...dataSets], dataSet => _.includes(this.state.activeSeries, dataSet.label));

    return {
      labels: [...this.props.data.times[index]],
      datasets: filteredSets
    };
  }

  getSeriesCheckboxes() {
    return [
      {
        label: 'min temperature',
        type: 'minTemp'
      },
      {
        label: 'temperature',
        type: 'temp'
      },
      {
        label: 'max temperature',
        type: 'maxTemp'
      }
    ]
  }

  onSeriesChange = (type) => {
    let activeSeries = [...this.state.activeSeries];
    if (_.includes(activeSeries, type)) {
      _.pull(activeSeries, type);
    }
    else {
      activeSeries.push(type);
    }
    this.setState({activeSeries});
  }

  render() {
    const chartOptions = {
      responsive: true,
      datasetFill : false,
      scaleLabel: "<%=value%>\xB0C",
      multiTooltipTemplate: "<%= datasetLabel %>: <%= value %>\xB0C",
      offsetGridLines: true,
    }

    const chartData = this.getData(this.state.activeDay);
    const seriesCheckboxes = this.getSeriesCheckboxes();
    const redraw = true;

    return (
      <div className="chart">
        <h2 className="chart__title">Temperature</h2>
        <div className="chart__series">
          {seriesCheckboxes.map(checkbox => {
            return (
              <Checkbox
                key={checkbox.label}
                defaultChecked
                className="chart__series-checkbox"
                label={checkbox.label}
                onChange={() => this.onSeriesChange(checkbox.label)}
                style={{backgroundColor: chartColors[checkbox.type].stroke}}/>
            );
          })}
        </div>
        {chartData.datasets.length ? (
          <LineChart data={chartData} options={chartOptions} redraw={redraw}/>
        ) : (
          <div className="chart__no-data">No data</div>
        )}
        <div className="chart__btns">
          {this.props.data.days.map((day, i) => {
            return <Button
              primary={this.state.activeDay === i ? true : false }
              onClick={() => this.setState({activeDay: i})}
              key={day}>{day}</Button>
          })}
        </div>
      </div>
    );
  }
}

Temperature.propTypes = {
  data: PropTypes.object,
};

export default Temperature;
