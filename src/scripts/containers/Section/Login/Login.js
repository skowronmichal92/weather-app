import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Form, Button, Message } from 'semantic-ui-react';
import SimpleReactValidator from 'simple-react-validator';

import * as actions from '../../../store/actions';
import Field from '../../../components/UI/Field/Field';

import { updatePageTitle } from '../../../other/utils.js';
import { STORAGE_USER_DATA, STORAGE_USER_LOGGED } from '../../../other/constants.js';

const fields = [
  {
    label: 'Email',
    name: 'email',
    validationOptions: 'required',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    validationOptions: 'required',
  }
];

class Login extends Component {

  constructor() {
    super();

    this.validator = new SimpleReactValidator();

    this.state = this.initState();
  }

  initState() {
    const stateObj = {
      userNotExists: false,
      invalidPassword: false,
      loginData: {}
    };
    fields.forEach(field => {
      stateObj.loginData[field.name] = '';
    });
    return stateObj;
  }

  setStateFromInput = e => {
    this.setState({
      loginData: {
        ...this.state.loginData,
        [e.target.name]: e.target.value
      }
    });
  }

  saveLoggedUser() {
    localStorage.setItem(STORAGE_USER_LOGGED, JSON.stringify(this.state.loginData));
  }

  loadLoggedUSer() {
    const storageLoginData = localStorage.getItem(STORAGE_USER_LOGGED);
    const storageUserData = localStorage.getItem(STORAGE_USER_DATA);

    if (storageLoginData && storageUserData) {
      const loginData = JSON.parse(storageLoginData);
      const userData = JSON.parse(storageUserData);

      if (userData[loginData.email]) {
        this.props.logIn(loginData.email);
      }
      else {
        localStorage.removeItem(STORAGE_USER_LOGGED);
      }

    }
  }

  checkLogin() {
    const storageUserData = localStorage.getItem(STORAGE_USER_DATA);

    if (storageUserData) {
      const userData = JSON.parse(storageUserData);
      const login = this.state.loginData;

      if (userData[login.email]) {
        const userPassword = login.password;
        const loginPassword = userData[login.email].password;

        if (userPassword === loginPassword) {
          this.setState({
            userNotExists: false,
            invalidPassword: false
          });
          this.saveLoggedUser();
          this.props.logIn(login.email);
        }
        else {
          this.setState({invalidPassword: true});
        }
      }
      else {
        this.setState({userNotExists: true});
      }

    }
    else {
      this.setState({userNotExists: true});
    }
  }

  submitForm = () => {

    if (this.validator.allValid()) {
      this.checkLogin();
    }
    else {
      this.validator.showMessages();
      this.forceUpdate();
    }

  }

  componentDidMount() {
    updatePageTitle('Log In');

    this.loadLoggedUSer();
  }

  componentDidUpdate() {
    if (this.props.auth) {
      this.props.history.push('/');
    }
  }

  render() {
    const formValid = !this.state.userNotExists && !this.state.invalidPassword;

    return (
      <div className="login form-panel">
        <div className="form-panel__header">
          <h2 className="form-panel__title">Log In</h2>
        </div>

        <Form error={!formValid} className="login__form" onSubmit={this.submitForm}>
          {fields.map(field => <Field
            key={field.label}
            {...field}
            value={this.state.loginData[field.name]}
            changed={this.setStateFromInput}
            validator={this.validator}/>)}

          {this.state.userNotExists && (
            <Message
              error
              header='Invalid User'
              content={`User with mail ${this.state.loginData.email} does not exist`}
            />
          )}

          {this.state.invalidPassword && (
            <Message
              error
              header='Invalid Password'
              content={`Wrong password for user with mail ${this.state.loginData.email}`}
            />
          )}

          <div className="form-panel__btns">
            <Button primary type='submit' className="login__btn">Log In</Button>
          </div>
        </Form>

        <div className="login__info">
          <span>{"Don't have an account?"} <Link to="/register">Create one!</Link></span>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func,
  auth: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logIn: (user) => dispatch(actions.logIn(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
