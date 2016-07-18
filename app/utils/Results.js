import fs from 'fs'
import stringify from 'csv-stringify'

const header = ['word', 'is_real', 'patient_is_real', 'time']

const patientWordToArray = patient_word => header.map(h => patient_word[h])

export function saveCsv(patient_words, csv_path) {
  const header_str = header.join(',')
  var patient_words_strs = patient_words.map(pw =>
    patientWordToArray(pw).join(','))

  patient_words_strs.unshift(header_str)

  fs.writeFileSync(csv_path, patient_words_strs.join('\n'))
}
