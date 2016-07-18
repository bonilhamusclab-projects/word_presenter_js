import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import WordDisplay from '../components/WordDisplay'
import * as ConfigActions from '../actions/config'
import * as ResultsActions from '../actions/results'

function mapStateToProps(state) { return state }

function mapDispatchToProps(dispatch) {
  const all_actions = Object.assign({}, ConfigActions, ResultsActions)
  return bindActionCreators(all_actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WordDisplay);
