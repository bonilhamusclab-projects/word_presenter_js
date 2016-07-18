import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import config from './config'
import {results, resultsfile} from './results'

const rootReducer = combineReducers({
  config,
  results,
  resultsfile,
  routing
});

export default rootReducer;
