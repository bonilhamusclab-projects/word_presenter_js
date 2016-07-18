import math from 'mathjs'
import React, { Component } from 'react'
import { Link } from 'react-router';
import u from 'underscore'

import BlinkingFooter from './BlinkingFooter'
import { repeatArray, timeDiffToMs } from '../utils/Utils'

import styles from './Styles.css'

const word_style = {
  position: 'absolute',
  top: '30%',
  left: '10px',
  textAlign: 'center',
  fontSize: '100px'
}

const PRESS_START_APP_STATE='press start to begin'
const SETTING_UP_APP_STATE='setting up...'
const START_SIG_APP_STATE='start signal'
const WORD_DISPLAY_APP_STATE='displaying words'
const STOP_SIG_APP_STATE='stop signal'
const RUN_COMPLETE_APP_STATE='experiment complete'

function tickCallbackGen(component) {

  const durationToTicks = duration => math.floor(duration / 250)

  const toSignalTicks = (signal) => {
    const num_flashes = signal.num_flashes
    const num_ticks_per_flash = durationToTicks(signal.flash_duration)

    const flash_pattern = repeatArray([true], num_ticks_per_flash/2)
      .concat(repeatArray([false], num_ticks_per_flash/2))

    return repeatArray(flash_pattern, num_flashes)
  }

  const toDisplayTicks = (display) => {
    const num_pause_ticks = durationToTicks(display.pause_duration)
    const num_show_ticks = durationToTicks(display.show_duration)

    return repeatArray([true], num_show_ticks)
      .concat(repeatArray([false], num_pause_ticks))
  }

  const falses = num => repeatArray([false], num)

  const config = component.props.config

  const set_up_signal_ticks = repeatArray([false], 8)
  const set_up_display_ticks = set_up_signal_ticks

  const start_signal_ticks = toSignalTicks(config.start_signal)
  const start_display_ticks = falses(start_signal_ticks.length)

  const stop_signal_ticks = toSignalTicks(config.stop_signal)
  const stop_display_ticks = falses(stop_signal_ticks.length)

  const word_display_ticks = toDisplayTicks(config.word_display)
  var word_signal_ticks = toSignalTicks(config.word_signal)
  word_signal_ticks = word_signal_ticks
    .concat(falses(word_display_ticks.length - word_signal_ticks.length))

  const num_words = config.words ? config.words.length : 0
  const combineTicks = (set_up, start, word, stop) => set_up
    .concat(start)
    .concat(repeatArray(word, num_words))
    .concat(stop)

  const signal_ticks = combineTicks(set_up_signal_ticks,
    start_signal_ticks,
    word_signal_ticks,
    stop_signal_ticks)

  const display_ticks = combineTicks(set_up_display_ticks,
    start_display_ticks,
    word_display_ticks,
    stop_display_ticks)

  const begin_start_tick = set_up_signal_ticks.length - 1
  const begin_display_tick = begin_start_tick + start_signal_ticks.length
  const begin_stop_tick = begin_display_tick + word_signal_ticks.length * num_words
  const complete_tick = begin_stop_tick + stop_display_ticks.length
  const app_state_look_up = {
    0: SETTING_UP_APP_STATE,
    [begin_start_tick]: START_SIG_APP_STATE,
    [begin_display_tick]: WORD_DISPLAY_APP_STATE,
    [begin_stop_tick]: STOP_SIG_APP_STATE,
    [complete_tick]: RUN_COMPLETE_APP_STATE
  }

  var tick_count = 0
  const time = process.hrtime()
  return () => {
    if (tick_count >= display_ticks.length) {
      component.complete()
      return
    }

    var new_state = {}

    const state_desc = app_state_look_up[tick_count]

    state_desc && (new_state.state_desc = state_desc)

    if (display_ticks[tick_count]) {
      new_state.display_word = true

      const is_new_word = !(display_ticks[tick_count - 1])
      if (is_new_word) {
        new_state.word_ix = component.state.word_ix + 1
        new_state.word_status = ''

        const time_diff = timeDiffToMs(process.hrtime(time))
        var patient_words = component.updatePatientWords(
          'time', time_diff, new_state.word_ix)
        new_state.patient_words = patient_words
      }
    } else {
      new_state.display_word = false
    }

    new_state.flash = signal_ticks[tick_count]

    component.setState(new_state)
    tick_count += 1
  }
}


export default class WordDisplay extends Component {
  constructor(props) {
    super(props)

    var patient_words = this.props.config.words.map(
      w => Object.assign({}, w))

    this.state = {font_size: 100, is_on: false, word_ix: -1,
      display_word: true,
      word_status: '',
      state_desc: PRESS_START_APP_STATE,
      flash: false,
      patient_words
    }
  }
  setFontSize(self, value) {
    self.setState({font_size: value})
  }
  run() {
    this.timer = setInterval(tickCallbackGen(this), 250)
    this.setState({is_on: true})
  }
  stopTimer() {
    clearInterval(this.timer)
    this.timer = null
  }
  complete() {
    this.stop()
    this.props.setpatientwords(this.state.patient_words)
    this.setState({
      state_desc: RUN_COMPLETE_APP_STATE
    })
  }
  stop() {
    this.stopTimer()
    this.setState({word_ix: -1,
      is_on: false,
      word_status: '',
      state_desc: PRESS_START_APP_STATE
    })
  }
  updatePatientWords(field, value, word_ix=this.state.word_ix) {
    this.state.patient_words[word_ix][field] = value
    return this.state.patient_words
  }
  realButtonPress(self) {
    var patient_words = self.updatePatientWords('patient_is_real', true)
    self.setState({word_status: 'btn-success',
      patient_words})
  }
  fakeButtonPress(self) {
    var patient_words = self.updatePatientWords('patient_is_real', false)
    self.setState({word_status: 'btn-danger',
      patient_words})
  }
  correctIncorrectButtons() {
    const btns = (
      <div>
        <hr/>
        <div className="row container-fluid">
          <button className="btn-success col-xs-5"
            onClick={e => this.realButtonPress(this)}>
            Real
          </button>
          <button className="btn-danger col-xs-5 col-xs-offset-1"
            onClick={e => this.fakeButtonPress(this)}>
            Fake
          </button>
        </div>
      </div>
    )
    return this.state.is_on ? btns : ''
  }
  currentWord() {
    const ix = this.state.word_ix
    const word = ix < 0 ? '-- Sample --' : this.props.config.words[ix].word
    return this.state.display_word ? word : '-----'
  }
  viewResultsButton() {
    if (this.state.state_desc == RUN_COMPLETE_APP_STATE) {
      return (
        <div>
          <hr/>
          <Link to="/viewresults">
            <button class="row">
            View Results
            </button>
          </Link>
        </div>
      )
    }
  }
  render() {
    return (
      <div>
        <Link to="/">
          <p className={styles.backstyle}>Main Screen</p>
        </Link>
        <div className="container-fluid">
          <div className="row-fluid">
            <div className="col-md-9">
              <p style={{'fontSize': this.state.font_size + 'px'}}>
                {this.currentWord()}
              </p>
            </div>
            <div className="col-md-3 panel panel-default">
              <h4 className="panel-heading">Settings</h4>
              <div className="panel-body">
                <div className="row">
                  <label>Font Size: {this.state.font_size}</label>
                  <input type="range" min="80" max="200" step="10" value={this.state.font_size} onChange={e => this.setFontSize(this, e.target.value)}/>
                </div>
                <hr/>
                <div className="row">
                  <label className={this.state.word_status}>
                    Word {this.state.word_ix + 1} out of {this.props.config.words.length}
                  </label>
                </div>
                {this.correctIncorrectButtons()}
                <hr/>
                <div className="row">
                  <label>
                    App State: {this.state.state_desc}
                  </label>
                </div>
                <hr/>
                <div className="row container-fluid">
                  <button disabled={this.state.is_on} onClick={this.run.bind(this)} className='col-xs-5'>
                    Start
                  </button>
                  <button disabled={!this.state.is_on} onClick={this.stop.bind(this)} className='col-xs-5 col-xs-offset-1'>
                    Stop
                  </button>
                </div>
                {this.viewResultsButton()}
              </div>
            </div>
          </div>
        </div>
        <BlinkingFooter height="150px" left="9" right="3" flash={this.state.flash}/>
      </div>
    );
  }
}
