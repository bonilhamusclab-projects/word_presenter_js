export const SET_PATIENT_WORDS='SET_PATIENT_WORDS'
export const SET_RESULTS_FILE='SET_RESULTS_FILE'

export function setpatientwords(patient_words) {
  return {
    type: SET_PATIENT_WORDS,
    patient_words
  }
}

export function setresultsfile(results_file) {
  return {
    type: SET_RESULTS_FILE,
    results_file
  }
}
