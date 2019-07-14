import React from 'react';
import { connect } from 'react-redux';
import MenuBar from '../MenuBar';
import PracticeTestSubjectCard from '../PracticeTestSubjectCard';
import { practice_test_content } from '../../../constants/practice_test_content';
import { withRouter } from 'react-router-dom';
import './PracticeTestBodySection.scss';

class PracticeTestBodySection extends React.Component {
  render() {
    let { simulationsByTest, user }  = this.props;
    let simulation_id = this.props.match.params.id;
    let simulations;
    if (user.current_test == "ACT") {
      simulations = simulationsByTest[simulation_id - 1]
    } else {
      simulations = simulationsByTest[simulation_id - 5]
    }

    return <div className="subject_list">
      {
        simulations && simulations.simulations.map((sim, key) => {
          const content = practice_test_content[sim.section_name.toLowerCase()];
          let src = content["image"];
          let title = content["title"];
          let description = content["description"];
          return <PracticeTestSubjectCard key={key} score={sim.score} progress={sim.progress} src={src} title={title} description={description} url={sim.simulation_url} />
        })
      }
    </div>
  }
};

const actions = {}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user.user
  };
}

export default withRouter(connect(mapStateToProps, actions)(PracticeTestBodySection));
