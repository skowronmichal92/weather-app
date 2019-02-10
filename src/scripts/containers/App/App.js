import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Layout from '../../hoc/Layout/Layout';

import Dashboard from '../Section/Dashboard/Dashboard';
import Login from '../Section/Login/Login';
import Register from '../Section/Register/Register';

import { CityContext } from '../../store/context/context';

class App extends Component {
  state = {
    cityDesc: 'Kraków, POL',
    cityValue: 'Kraków,pl',
  }

  static childContextTypes = {
    cityDesc: PropTypes.string,
    cityValue: PropTypes.string
  };

  getChildContext() {
    return {
      cityDesc: this.state.cityDesc,
      cityValue: this.state.cityValue
    }
  }

  changeCity = (cityDesc, cityValue) => {
    this.setState({ cityDesc, cityValue });
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/register" render={() => (
            this.props.auth ? (
              <Redirect to="/" />
            ) : (
              <Register/>
            )
          )}/>
          <Route exact path="/login" render={() => (
            this.props.auth ? (
              <Redirect to="/" />
            ) : (
              <Login/>
            )
          )}/>
          <Route exact path="/" render={() => (
            !this.props.auth ? (
              <Redirect to="/login" />
            ) : (
              <CityContext.Provider value={{
                cityDesc: this.state.cityDesc,
                cityValue: this.state.cityValue,
                changeCity: this.changeCity
              }}>
                <Dashboard/>
              </CityContext.Provider>
            )
          )}/>
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }

}

App.propTypes = {
  auth: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  }
}

export default connect(mapStateToProps)(App);
