import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ChartJS from 'react-chartjs';

import { Button } from 'semantic-ui-react';

const BarChart = ChartJS.Bar;

const chartColors = {
  humidity: {
    fill: '#F4A460',
  },
}

class Humidity extends Component {
  state = {
    activeDay: 0
  }

  getData(index) {
    const dataSets = [
      {
        label: "humidity",
        fillColor: chartColors.humidity.fill,
        pointColor: chartColors.humidity.fill,
        data: this.props.data.humidities[index]
      },
    ];

    return {
      labels: [...this.props.data.times[index]],
      datasets: dataSets
    };
  }

  render() {
    const chartOptions = {
      responsive: true,
      scaleLabel: "<%=value%>%",
      tooltipTemplate: "<%= label %>: <%=value%>%",
    }

    const chartData = this.getData(this.state.activeDay);
    const redraw = true;

    return (
      <div className="chart">
        <h2 className="chart__title">Humidity</h2>
        <BarChart data={chartData} options={chartOptions} redraw={redraw}/>
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

Humidity.propTypes = {
  data: PropTypes.object,
};

export default Humidity;
