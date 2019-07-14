import React from 'react';
import { connect } from 'react-redux';
import DiagnosticTestSubjectCard from '../DiagnosticTestSubjectCard';
import './DiagnosticTestBodySection.css';
import {
  topicRequest
} from '../../../actions/topicActions';

class DiagnosticTestBodySection extends React.Component {
  constructor(props) {
    super(props);
    props.topicRequest(props.diagnostic.section_id);
  }

  componentDidUpdate(prevProps){
    if (this.props.diagnostic.section_id !== prevProps.diagnostic.section_id) {
      this.props.topicRequest(this.props.diagnostic.section_id);
    }
  }

  compare(a,b) {
    if (a.score < b.score)
      return -1;
    if (a.score > b.score)
      return 1;
    return 0;
  }

  render() {
    let { user, diagnostic, topicList }  = this.props;
    let diagnostic_finished = diagnostic.part1_finished
    let sorted_topics = topicList.slice().sort(this.compare);
    return <div className="subject_list">
      {
        sorted_topics && sorted_topics.map((subject, key) => {
          return <DiagnosticTestSubjectCard key={key} index={key} title={subject.name} skillStyle="" description={subject.definition} complete={subject.is_finished} skills={subject.skills} completed_drill_down={subject.completed_drill_down} is_finished={subject.is_finished} diagnostic_finished={diagnostic_finished} topicId={subject.id}/>
        })
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

export default connect(mapStateToProps, actions)(DiagnosticTestBodySection);
