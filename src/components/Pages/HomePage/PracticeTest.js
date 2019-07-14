import React from 'react';
import { connect } from 'react-redux';
import PracticeTestCard from '../../Shared/QbPracticeTestCard/QbPracticeTestCard';
import './PracticeTest.scss';

class PracticeTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCollapsed: true };
  }

  collapseClick(e) {
    e.preventDefault();
    this.setState({'isCollapsed':!this.state.isCollapsed})
  }

  render() {
    let isCollapsed = this.state.isCollapsed;
    let { user } = this.props;

    return <div className="practice_wrapper">
      <div className="practice_heading">
        <h4>Do you know that we have full-length practice tests available?</h4>
      </div>
      { !isCollapsed ?
         user.current_test === "ACT" ?
           <div className="practice_card_wrapper">
             <PracticeTestCard testName="ACT Test 1" testId={'1'} disabled={false} buttonLabel="Go" />
             <PracticeTestCard testName="ACT Test 2" testId={'2'} disabled={false} buttonLabel="Go" />
             <PracticeTestCard testName="ACT Test 3" testId={'3'} disabled={true} buttonLabel="Coming Soon"/>
             <PracticeTestCard testName="ACT Test 4" testId={'4'} disabled={true} buttonLabel="Coming Soon"/>
           </div> :
           <div className="practice_card_wrapper">
             <PracticeTestCard testName="SAT Test 1" testId={'5'} disabled={false} buttonLabel="Go" />
             <PracticeTestCard testName="SAT Test 2" testId={'6'} disabled={false} buttonLabel="Go" />
             <PracticeTestCard testName="SAT Test 3" testId={'7'} disabled={true} buttonLabel="Coming Soon"/>
             <PracticeTestCard testName="SAT Test 4" testId={'8'} disabled={true} buttonLabel="Coming Soon"/>
           </div>
         : ''
      }
      <div className="collapse" onClick={(e)=> this.collapseClick(e)}>
        { isCollapsed ? (<p className="expand">Expand for more</p>) : (<p className="collapse">Collapse</p>) }
      </div>
    </div>
  }
};

const actions = {}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user.user
  };
}

export default connect(mapStateToProps, actions)(PracticeTest);
