import React, { Component } from 'react'
import { Link } from 'react-router'
import { remote } from 'electron'

import { saveCsv } from '../utils/Results'

import styles from './Styles.css'


function patientWordToHtml(patient_word) {
  const isRealToClass = is_real => {
    return is_real == undefined ? '' :
      is_real ? 'btn-success' : 'btn-danger'
  }
  console.log(patient_word)
  return (
    <tr>
      <td>{patient_word.word}</td>
      <td className={isRealToClass(patient_word.is_real == "true")}>
        {patient_word.is_real}
      </td>
      <td className={isRealToClass(patient_word.patient_is_real)}>
        {`${patient_word.patient_is_real}`}
      </td>
      <td>{patient_word.time}</td>
    </tr>
  )
}

export default class ViewResults extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  saveresults(self) {
    var results_path = remote.dialog.showSaveDialog({defaultPath: "."})
    if (results_path !== undefined) {
      self.props.setresultsfile(results_path)

      saveCsv(self.props.results, results_path)
    }
  }
  render() {
    return (
      <div className="container">
        <Link to="/worddisplay" className={styles.backstyle}>
          <p>Word Display</p>
        </Link>
        <div className="row">
          <h2>View Results</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Word</th>
                <th>Is Real</th>
                <th>Patient Said Is Real</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {this.props.results.map(patientWordToHtml)}
            </tbody>
          </table>
        </div>
        <hr/>
        <button className="row" onClick={e => this.saveresults(this)}>
          Save Results
        </button>
      </div>
    );
  }
}
