import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SubjectBodySection.css';
import QbTopicCard from '../../Shared/QbTopicCard/QbTopicCard';
import {
  topicRequest
} from '../../../actions/topicActions';

class SubjectBodySection extends Component {
  constructor(props) {
    super(props);
    props.topicRequest(props.section_id);
  }

  componentDidUpdate(prevProps){
    if (!this.props.topicList && this.props.user.current_test !== prevProps.user.current_test) {
      this.props.topicRequest(this.props.section_id);
    }
  }

  render() {
    let { topicList } = this.props;

    return <div className="subject-body">
      {
        topicList.map((topic, key) =>
          <QbTopicCard key={key} topic={topic} />
        )
      }
    </div>
  }
};

const actions = {
  topicRequest
}

const mapStateToProps = (state) => {
  return {
    topicList: state.topicReducer.topicList,
    user: state.userReducer.user.user
  };
}

export default connect(mapStateToProps, actions)(SubjectBodySection);
