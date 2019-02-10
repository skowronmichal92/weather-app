import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../../containers/Layout/Header/Header';
import Footer from '../../components/Layout/Footer/Footer';

class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <Header/>
        <main className="main">
          {this.props.children}
        </main>
        <Footer/>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
