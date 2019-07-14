import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderSection from '../HeaderSection';
import HomeBodySection from './HomeBodySection';
import QbNextTopicCard from '../../Shared/QbTopicCard/QbNextTopicCard'
import { getUnique } from "../../../util/helpers";
import './NextUp.scss';
import {
  weakestTopicRequest,
  resetWeakestTopic
} from '../../../actions/topicActions';
import {
  weakestSkillRequest,
  resetWeakestSkill
} from '../../../actions/skillActions';

class NextUp extends React.Component {
  constructor(props) {
    super(props);
  }

  showNextUp(diagnostic) {
    let show = false
    diagnostic.some((d)=> {
      if (d.part1_finished === true){
        show = true
      }
    })
    return show
  }

  componentDidUpdate(prevProps){
    if (this.props.diagnostic !== prevProps.diagnostic) {
      this.props.resetWeakestSkill();
      this.props.resetWeakestTopic();
      this.props.diagnostic.map((d)=>{
        this.props.weakestTopicRequest(d.section_id)
        this.props.weakestSkillRequest(d.section_id)
      })
    }
  }

  componentWillMount() {
    this.props.resetWeakestSkill();
    this.props.resetWeakestTopic();
    this.props.diagnostic.map((d)=>{
      this.props.weakestTopicRequest(d.section_id)
    })
    this.props.diagnostic.map((d)=>{
      this.props.weakestSkillRequest(d.section_id)
    })
  }

  render() {
    let user = this.props.user;
    let { weakestTopicList, weakestSkillList } = this.props;
    let skillList = []
    let filteredTopics = weakestTopicList.filter(function(el) { return el; })
    let filteredSkills = weakestSkillList.filter(function(el) { return el; })
    let dedupedTopics = getUnique(filteredTopics, 'id')
    let dedupedSkills = getUnique(filteredSkills, 'id')
    skillList.push(dedupedTopics)
    skillList.push(dedupedSkills)
    let visible = this.showNextUp(this.props.diagnostic);
    let { isNextUp } = this.props || true;
    let nextUpClassName = isNextUp ? 'next_up_added' : null;

    return <div className ={`next_up_wrapper ${nextUpClassName}`}>
       { !visible ? <LockedSection /> : null }
       { visible && skillList ? <QbNextTopicCard showScore="false" topicName={'Next Up For You'} skillList={skillList} /> : null }
    </div>
  }
};

const LockedSection = () => (
  <div className="locked_wrapper">
    <div className="topic-name">
      <h4>Next Up For You</h4>
    </div>
    <div className="locked_container">
      <i className="fa fa-lock" aria-hidden="true"></i>
      <p className="locked_content">Complete at least one diagnostic test to see what's next for you</p>
    </div>
  </div>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators({ weakestTopicRequest, weakestSkillRequest, resetWeakestTopic, resetWeakestSkill }, dispatch);

const mapStateToProps = (state) => {
  return {
    weakestTopicList: state.topicReducer.weakestTopicList,
    weakestSkillList: state.skillReducer.weakestSkillList,
    user: state.userReducer.user.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NextUp);
