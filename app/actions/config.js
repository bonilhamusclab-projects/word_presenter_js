export const SET_WORDS = 'SET_WORDS'
export const SET_START_SIGNAL = 'SET_START_SIGNAL'
export const SET_STOP_SIGNAL = 'SET_STOP_SIGNAL'
export const SET_WORD_SIGNAL = 'SET_WORD_SIGNAL'
export const SET_WORD_DISPLAY = 'SET_WORD_DISPLAY'
export const SET_WORDS_PATH = 'SET_WORDS_PATH'
export const SET_CONFIG_PATH = 'SET_CONFIG_PATH'


export function setwords(words) {
  return {
    type: SET_WORDS,
    words
  }
}

export function setstartsignal(start_signal) {
  return {
    type: SET_START_SIGNAL,
    start_signal
  }
}

export function setstopsignal(stop_signal) {
  return {
    type: SET_STOP_SIGNAL,
    stop_signal
  }
}

export function setwordsignal(word_signal){
  return {
    type: SET_WORD_SIGNAL,
    word_signal
  }
}

export function setworddisplay(word_display){
  return {
    type: SET_WORD_DISPLAY,
    word_display
  }
}

export function setwordspath(words_path) {
  return {
    type: SET_WORDS_PATH,
    words_path
  }
}

export function setconfigpath(config_path) {
  return {
    type: SET_CONFIG_PATH,
    config_path
  }
}
