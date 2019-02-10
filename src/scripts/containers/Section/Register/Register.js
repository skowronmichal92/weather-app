import React, { Component } from 'react';
import { withRouter } from 'react-router';

import PropTypes from 'prop-types';
import { Button, Form, Message } from 'semantic-ui-react';
import SimpleReactValidator from 'simple-react-validator';

import Field from '../../../components/UI/Field/Field';

import { updatePageTitle } from '../../../other/utils.js';
import { STORAGE_USER_DATA } from '../../../other/constants.js';

const fields = [
  {
    label: 'Name',
    name: 'fname',
    validationOptions: 'required',
  },
  {
    label: 'Last Name',
    name: 'lname',
    validationOptions: 'required',
  },
  {
    label: 'Email',
    type: 'email',
    name: 'email',
    validationOptions: 'required|email',
  },
  {
    label: 'Phone',
    type: 'tel',
    name: 'phone',
    validationOptions: 'required|phone',
  },
  {
    label: 'Street',
    name: 'address',
    validationOptions: 'required',
  },
  {
    label: 'City',
    name: 'city',
    validationOptions: 'required',
  },
  {
    label: 'Password',
    type: 'password',
    name: 'password',
    validationOptions: 'required|alpha_num|min:6',
  },
  {
    label: 'Repeat Password',
    type: 'password',
    name: 'repassword',
    validationOptions: 'required|alpha_num|min:6',
  },
];

class Register extends Component {

  constructor() {
    super();

    this.validator = new SimpleReactValidator();

    this.state = this.initState();
  }

  initState() {
    const stateObj = {
      passwordsDifferent: false,
      accountExists: false,
      userData: {}
    };
    fields.forEach(field => {
      stateObj.userData[field.name] = '';
    });
    return stateObj;
  }

  componentDidMount() {
    updatePageTitle('Register');
  }

  setStateFromInput = e => {
    this.setState({
      userData: {
        ...this.state.userData,
        [e.target.name]: e.target.value
      }
    });
  }

  getAcoountsDataBase() {
    const userData = localStorage.getItem(STORAGE_USER_DATA);
    if (userData) {
      return JSON.parse(userData);
    }
    else {
      return {};
    }
  }

  saveAccount() {
    const acoountsDataBase = this.getAcoountsDataBase();
    const user = this.state.userData.email;

    if (acoountsDataBase[user]) {
      this.setState({accountExists: true});
    }
    else {
      this.setState({accountExists: false});
      acoountsDataBase[user] = this.state.userData;
      localStorage.setItem(STORAGE_USER_DATA, JSON.stringify(acoountsDataBase));
    }
  }

  submitForm = () => {
    if (this.validator.allValid()) {

      if (this.state.userData.password === this.state.userData.repassword) {
        this.setState({passwordsDifferent: false});
        this.saveAccount();
        this.props.history.push('/');
      }
      else {
        this.setState({passwordsDifferent: true});
      }
    }
    else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    const formValid = !this.state.passwordsDifferent && !this.state.accountExists;

    return (
      <div className="register form-panel container">
        <div className="form-panel__header">
          <h2 className="form-panel__title">Create new account</h2>
        </div>

        <Form error={!formValid} className="register__form" onSubmit={this.submitForm}>
          {fields.map(field => <Field
            key={field.name}
            {...field}
            value={this.state.userData[field.name]}
            changed={this.setStateFromInput}
            validator={this.validator}
            />)}

            {this.state.passwordsDifferent && (
              <Message
                error
                header='Invalid Passwords'
                content='Repeated password did not match initial password'
              />
            )}

            {this.state.accountExists && (
              <Message
                error
                header='Account Exists'
                content={`Account registered to mail ${this.state.userData.email} already exists`}
              />
            )}

          <div className="register__btns form-panel__btns">
            <Button primary type='submit'>Create Account</Button>
          </div>
        </Form>

      </div>
    );
  }
}

Register.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Register);
