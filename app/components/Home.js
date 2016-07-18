import React, { Component } from 'react';
import { Link } from 'react-router';
import ConfigPage from '../containers/Config'


export default class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>Word Presenter</h2>
          <ConfigPage/>
        </div>
      </div>
    );
  }
}
