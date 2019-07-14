import React, { Component } from 'react';
import QbSkillCard from './QbSkillCard/QbSkillCard';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { fn_ParsePercentage } from '../../../util/helpers';
import QbSubjectTopic from './QbSubjectTopic';
import './QbTopicCard.css';
import {
  userTopicRequest
} from '../../../actions/topicActions';

class QbTopicCard extends Component {
  constructor(props) {
    super(props);
    props.userTopicRequest(props.user.id, props.topic.id)
  }

  render() {
    const { topic }  = this.props;
    let skillList = topic.skills;
    let topicName = topic.name;
    let topicId = topic.id;
    let diagnosticLatest = topic.diagnostic_latest
    return (
      <div>
        <QbSubjectTopic {...{topicName, skillList, topicId, diagnosticLatest}} />
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

export default connect(mapStateToProps, mapDispatchToProps)(QbTopicCard);
