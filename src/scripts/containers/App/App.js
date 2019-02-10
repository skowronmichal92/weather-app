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
    city: 'Kraków, POL',
  }

  changeCity = city => {
    this.setState({ city });
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
          <CityContext.Provider value={{
            city: this.state.city,
            changeCity: this.changeCity
          }}>
            <Route exact path="/" render={() => (
              !this.props.auth ? (
                <Redirect to="/login" />
              ) : (
                <Dashboard/>
              )
            )}/>
          </CityContext.Provider>
        </Switch>
      </Layout>
    );
  }

  // render() {
  //   return (
  //     <Layout>
  //       <Switch>
  //         <Route path='/register' component={Register} />
  //         <Route path='/login' component={Login} />
  //         <CityContext.Provider value={{
  //           city: this.state.city,
  //           changeCity: this.changeCity
  //         }}>
  //           <Route path='/' component={Dashboard}/>
  //         </CityContext.Provider>
  //       </Switch>
  //     </Layout>
  //   );
  // }
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
