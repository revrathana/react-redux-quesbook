import React from 'react';
import { connect } from 'react-redux';
import HeaderSection from '../HeaderSection';
import { withRouter } from 'react-router-dom'
import SubjectBodySection from '../SubjectBodySection';
import QbCard from '../../Shared/QbCard/QbCard.js';
import { skill_page_content } from '../../../constants/skill_page_content.js';
import './SkillPage.css';
import {
  skillRequest
} from '../../../actions/skillActions';

class SkillPage extends React.Component {
  constructor (props) {
    super(props)
    props.skillRequest(props.match.params.id)
  }

  render() {
    const { skill } = this.props;
    let section = this.props.match.params.section
    let section_name = "readingwriting" ? "reading" : section
    let study_content = skill_page_content["study"]
    let prac_content = skill_page_content["practice_questions"]
    let eclass_content = skill_page_content["eclass"]
    let skill_id = this.props.match.params.id
    return <div>
      <HeaderSection section={section_name} src={`quesbook_${section}.png`} title={skill.name} body_content={skill.definition}  />
      <div className="topic-card">
        <div className="topic-name">
          <h4>Study Plan</h4>
        </div>
        <div className="study_plan_description">
          You can expect to see 2-3 questions on this skill come exam day. According to the diagnostic you took earlier, you’ve scored 2 out 5 on this skill.  By improving this skill, you are one step closer to landing your dream score
        </div>
          <QbCard src={study_content["image"]} title={study_content["title"]} button_label={study_content["button_label"]} description={study_content["description"]} url={`/start_new/#/studyMatArticle/${section}/${skill.article_id}`} imageLink={section} button_disabled={skill.article_id ? false : true }/>
          <QbCard src={prac_content["image"]} title={prac_content["title"]} button_label={prac_content["button_label"]} description={prac_content["description"]} url={skill.practice_by_skill_url} imageLink={section} />
      </div>
    </div>
  }
};

const actions = {
  skillRequest
}

const mapStateToProps = (state) => {
  return {
    skill: state.skillReducer.skill
  };
}

export default withRouter(connect(mapStateToProps, actions)(SkillPage));
