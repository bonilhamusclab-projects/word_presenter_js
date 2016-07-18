import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ViewResults from '../components/ViewResults.jsx';
import * as ResultsActions from '../actions/results';

function mapStateToProps(state) { return state }

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ResultsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewResults);
