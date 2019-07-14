import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import QbSkillCard from './QbSkillCard/QbSkillCard';
import { connect } from 'react-redux';
import { fn_ParsePercentage } from '../../../util/helpers';
import './QbTopicCard.css';
import {
  userTopicRequest
} from '../../../actions/topicActions';

class QbSubjectTopicCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { topicName, section, topicId, skillList, diagnosticLatest } = this.props;
    return (
      <div className="topic-card">
        <div className="topic-name">
          <h4>{`Topic: ${topicName}`}</h4>
        </div>
        <div className="skill-cards">
          {
            skillList.map((skill, index) => {
              let { name, definition, id, skill_score, practice_by_skill_url } = skill;
              return (
                <QbSkillCard
                  section={skill.section.name.toLowerCase()}
                  diagnosticLatest={diagnosticLatest}
                  topicId={topicId}
                  score={skill_score}
                  skillName={name}
                  skillUrl={practice_by_skill_url}
                  skillDescription={definition}
                  skillId={id}
                  key={index} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ userTopicRequest }, dispatch);

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user.user,
    userTopicList: state.topicReducer.userTopicList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QbSubjectTopicCard);
