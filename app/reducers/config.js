import {SET_WORDS, SET_START_SIGNAL, SET_STOP_SIGNAL, SET_WORD_SIGNAL,
  SET_WORD_DISPLAY, SET_WORDS_PATH,
  SET_CONFIG_PATH} from '../actions/config'


export default function config(state={}, action) {
  const newobj = (k) => Object.assign({}, state, {
    [k]: action[k]
  })
  switch (action.type) {
    case SET_START_SIGNAL:
      return newobj('start_signal')
    case SET_STOP_SIGNAL:
      return newobj('stop_signal')
    case SET_WORD_SIGNAL:
      return newobj('word_signal')
    case SET_WORDS:
      return newobj('words')
    case SET_WORD_DISPLAY:
      return newobj('word_display')
    case SET_WORDS_PATH:
      return newobj('words_path')
    case SET_CONFIG_PATH:
      return newobj('config_path')
    default:
      return state
  }
}
