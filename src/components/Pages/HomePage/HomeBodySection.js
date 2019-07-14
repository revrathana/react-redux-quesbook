import React from 'react';
import { connect } from 'react-redux';
import './HomeBodySection.css';
import Diagnostic from './Diagnostic';
import PracticeTest from './PracticeTest';
import NextUp from './NextUp';
import {
  diagnosticRequest
} from '../../../actions/diagnosticActions';

class HomeBodySection extends React.Component {
  constructor(props) {
    super(props);
    props.diagnosticRequest();
  }

  componentDidUpdate(prevProps){
    if (this.props.user.current_test !== prevProps.user.current_test) {
      this.props.diagnosticRequest();
    }
  }

  render() {
    let diagnostic = this.props.diagnostic;
    return <div className="home_body">
      <Diagnostic diagnostic={diagnostic} />
      <PracticeTest />
      { diagnostic.length ? <NextUp diagnostic={diagnostic} /> : null }
    </div>
  }
};

const actions = {
  diagnosticRequest
}

const mapStateToProps = (state) => {
  return {
    diagnostic: state.diagnosticReducer.studyPlanSections,
    user: state.userReducer.user.user
  };
}

export default connect(mapStateToProps, actions)(HomeBodySection);
