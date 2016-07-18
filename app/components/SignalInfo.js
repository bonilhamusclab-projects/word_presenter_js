import React, { Component, PropTypes } from 'react';


class SignalInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="container">
        <h4 class="label label-default">{this.props.signaltype} Signal</h4>
        <div class="row">
          <label>Num Flashes:</label>
          <span> {this.props.signal.num_flashes}</span>
        </div>
        <div class="row">
          <label>Flash Duration (ms):</label>
          <span> {this.props.signal.flash_duration}</span>
        </div>
        <hr/>
      </div>
    );
  }
}

export default SignalInfo;
