import fs from 'fs'
import path from 'path'
import parse from 'csv-parse/lib/sync'

import random from 'random-js'


export function loadWords(words_file){
  const all_words = parse(
    fs.readFileSync(words_file, 'utf-8'),
    {columns: true, auto_parse:true})

  return random.sample(random.engines.nativeMath,
    all_words,
    all_words.length)
}


export function parseConfigFile(config_path) {
  var config_data = JSON.parse(fs.readFileSync(config_path))
  var words_file = path.join(path.dirname(config_path), config_data.words_path)

  config_data.words_file = words_file

  config_data.words = loadWords(words_file)
  return config_data
}
