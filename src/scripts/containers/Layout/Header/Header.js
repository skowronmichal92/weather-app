import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import MediaQuery from 'react-responsive';

import * as actions from '../../../store/actions';
import NavItem from './NavItem/NavItem';
import { pageWidths } from '../../../other/mediaQuery';

import {  STORAGE_USER_LOGGED } from '../../../other/constants.js';

import logo from '../../../../images/logo.svg';

const links = [
  {
    to: '/register',
    name: 'Create account'
  },
  {
    to: '/login',
    name: 'Log in',
    type: 'secondary'
  }
];


class Header extends Component {

  logOutHandler = () => {
    localStorage.removeItem(STORAGE_USER_LOGGED);
    this.props.logOut();
  }

  render() {

    return (
      <header className='header-nav'>
        <div className='container header-nav__container'>
          <h1 className='header-nav__title'>
            <Link className='header-nav__link' to='/'>
              <img className='header-nav__logo' src={logo}/>
              <MediaQuery minWidth={pageWidths.xxs}>
                <em>WeatherApp</em>
              </MediaQuery>
            </Link>
          </h1>
          {this.props.auth ? (
            <div className='user-panel'>
              <div><span><strong>{this.props.user}</strong></span></div>
              <div><a onClick={this.logOutHandler}>[Log Out]</a></div>
            </div>
          ) : (
            <nav className='nav'>
              <ul className='nav__list'>
                {links.map(link => <NavItem key={link.name} {...link}/>)}
              </ul>
            </nav>
          )}

        </div>
      </header>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.bool,
  user: PropTypes.string,
  logOut: PropTypes.func
};

const mapStateToProps = state => {
  return {
    auth: state.auth.auth,
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(actions.logOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
