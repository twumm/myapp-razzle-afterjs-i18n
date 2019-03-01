import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class About extends Component {
  static async getInitialProps({ req, res, match }) {
    const stuff = 'CallMyApi()';
    return { stuff };
  }
  
  render() {
    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <h1>About</h1>
        {this.props.stuff ? this.props.stuff: 'Loading...'}
      </div>
    );
  }
}

export default About;
