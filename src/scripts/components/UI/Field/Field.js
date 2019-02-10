import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'semantic-ui-react';

const field = (props) => {
  const name = props.name || props.label;
  const placeholder = props.placeholder || props.label;
  const type = props.type || 'text';

  return (
    <Form.Field>
      <label>{props.label}</label>
      {props.validator ? props.validator.message(name, props.value, props.validationOptions) : null}
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={props.value}
        onChange={props.changed}/>
    </Form.Field>
  );
}

field.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  changed: PropTypes.func,
  validator: PropTypes.object,
  validationOptions: PropTypes.string,
};

export default field;
