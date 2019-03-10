import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import logo from './react.svg';
import './Home.css';
import { Link } from 'react-router-dom';

class Home extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { whatever: 'stuff' };
  }

  render() {
    const { t } = this.props;
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>{t('message.welcome')}</h2>
        </div>
        <p className="Home-intro">
          To get started, edit <code>src/Home.js</code> or{' '}
          <code>src/About.js</code>and save to reload.
          <br />
          {t('guideline')}
        </p>
        <Link to="/about">About -></Link>
      </div>
    );
  }
}

export default withNamespaces('translations')(Home);
