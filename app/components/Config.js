import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { remote } from 'electron'
import { parseConfigFile } from '../utils/Config.js'
import SignalInfo from './SignalInfo'


class Config extends Component {
  constructor(props) {
    super(props)
    this.state =  {configpath: '', configdata: {}};
  }
  loadconfig(self) {
    var config_path = remote.dialog.showOpenDialog({defaultPath: "."})
    if (config_path !== undefined) {

      config_path = config_path[0]
      self.props.setconfigpath(config_path)

      var config_data = parseConfigFile(config_path)
      self.props.setstartsignal(config_data.start_signal)
      self.props.setstopsignal(config_data.stop_signal)
      self.props.setwordsignal(config_data.word_signal)
      self.props.setworddisplay(config_data.word_display)
      self.props.setwords(config_data.words)
      self.props.setwordspath(config_data.words_file)
    }
  }
  renderSignalInfo(signal, signaltype) {
    if (signal) {
      return <SignalInfo signal={signal} signaltype={signaltype}/>
    }
  }
  renderLabel(consistent, dynamic){
    if (dynamic) {
      return (
    <div>
      <div class="row">
        <label>{consistent}:</label>
        <span> {dynamic}</span>
      </div>
    </div>
      )
    }
  }
  render() {
    const config_hr = this.props.config.config_path ? <hr/> : ''
    return (
      <div>
        <hr/>
        {this.renderLabel("Config File", this.props.config.config_path)}
        {this.renderLabel("Words File", this.props.config.words_path)}
        {config_hr}
        {this.renderSignalInfo(this.props.config.start_signal, "Start")}
        {this.renderSignalInfo(this.props.config.stop_signal, "Stop")}
        {this.renderSignalInfo(this.props.config.word_signal, "Word")}
        <button onClick={e => this.loadconfig(this)} class="row">
          Load config
        </button>
        <Link to="/worddisplay">
          <button class="row" disabled={!this.props.config.config_path}>
            OK
          </button>
        </Link>
        <br/>
      </div>
    );
  }
}

export default Config;
