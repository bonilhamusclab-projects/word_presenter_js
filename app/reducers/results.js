import {SET_PATIENT_WORDS, SET_RESULTS_FILE} from '../actions/results'


export function results(state=[], action) {
  switch (action.type) {
    case SET_PATIENT_WORDS:
      return action.patient_words
    default:
      return state
  }
}

export function resultsfile(state='', action) {
  switch (action.type) {
    case SET_RESULTS_FILE:
      return action.results_file
    default:
      return state
  }
}
