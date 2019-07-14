import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import './PracticeTestHeader.scss';

class PracticeTestHeader extends React.Component {
  showScore(simulations) {
    let show = true
    simulations.some((s)=> {
      if (s.progress < "100"){
        show = false
      }
    })
    return show
  }

  render() {
    let { simulationsByTest, user } = this.props;
    let simulation_id = this.props.match.params.id;
    let simulations;
    let simulation_score;
    let simulation_test_id;
    let simulation_test_name;

    if (user.current_test == "ACT") {
      simulations = simulationsByTest[simulation_id - 1]
      simulation_test_id = simulation_id
      simulation_test_name = "Act"
    } else {
      simulations = simulationsByTest[simulation_id - 5]
      simulation_test_id = simulation_id - 4
      simulation_test_name = "Sat"
    }

    if (simulations) {
      simulation_score = simulations.simulations.reduce(function(prev, cur) {
        return prev + cur.score;
      }, 0);
    }

    return <div className="practice_test_header">
      <p className="prac_text_header">{`${simulation_test_name} Practice Test ${simulation_test_id}`}</p>
      <p className="composite">Composite Score</p>
        { simulations && this.showScore(simulations.simulations) == true ?
          <span className="blueDot"><div className="scoreText">{ simulation_score }</div></span>
            :
          <img src={require(`../../../../img/lock.png`)} />
        }
      <p className="complete">Complete all sections in this practice test to unlock
        <br/> your score</p>
      <div className="topic-name">
        <h4>Section Scores</h4>
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

export default withRouter(connect(mapStateToProps, actions)(PracticeTestHeader)); 
