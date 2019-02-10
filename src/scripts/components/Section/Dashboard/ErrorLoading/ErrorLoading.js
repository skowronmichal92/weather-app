import React from 'react';
import Aux from 'react-aux';

const errorLoading = () => {
  return (
    <Aux>
      <p>An error occured while retrieving data.</p>
      <p>Please, refresh the page or try again later.</p>
    </Aux>
  );
}

export default errorLoading;
