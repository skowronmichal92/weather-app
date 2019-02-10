import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';

const navItem = (props) => {
  const type = props.type || 'primary';
  const btnProps = { [type]: true };

  return (
    <li className='nav__item'>
      <Link className='header__link' to={props.to}><Button {...btnProps}>{props.name}</Button></Link>
    </li>
  );
}

navItem.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string
};

export default navItem;
