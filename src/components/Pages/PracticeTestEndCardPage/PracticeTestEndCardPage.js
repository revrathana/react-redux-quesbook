import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuBar from '../MenuBar';
import PracticeTestHeader from '../PracticeTestHeader';
import PracticeTestBodySection from '../PracticeTestBodySection';
import {
  simulationRequest
} from '../../../actions/simulationActions';

class PracticeTestEndCardPage extends React.Component {
  constructor(props) {
    super(props);
    props.simulationRequest();
  }

  componentDidUpdate(prevProps){
    if (this.props.user.current_test !== prevProps.user.current_test) {
      this.props.simulationRequest();
    }
  }

  render() {
    let { simulationsByTest, user }  = this.props;
    return <div>
      <div className="diagnostic_end_card">
        <MenuBar />
        { (simulationsByTest.length > 0) ? <PracticeTestHeader simulationsByTest={simulationsByTest} testName={this.props.user.current_test} /> : null }
        { (simulationsByTest.length > 0) ? <PracticeTestBodySection simulationsByTest={simulationsByTest}/> : null }
      </div>
    </div>
  }
};

const actions = {
  simulationRequest
}

const mapStateToProps = (state) => {

  return {
    simulationsByTest: state.simulationReducer.simulations,
    user: state.userReducer.user.user
  };
}

export default withRouter(connect(mapStateToProps, actions)(PracticeTestEndCardPage));
