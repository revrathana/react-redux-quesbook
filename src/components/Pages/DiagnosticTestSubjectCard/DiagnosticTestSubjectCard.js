import React, { Component } from 'react';
import QbButton from '../../Shared/QbButton/QbButton';
import { connect } from 'react-redux';
import './DiagnosticTestSubjectCard.scss';
import { API_URL } from '../../../constants/urls';

class DiagnosticTestSubjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = { isCollapsed: true };
  }

  collapseClick(e) {
    e.preventDefault();
    this.setState({'isCollapsed':!this.state.isCollapsed})
  }

  compare(a,b) {
    if (a.skill_score < b.skill_score)
      return -1;
    if (a.skill_score > b.skill_score)
      return 1;
    return 0;
  }

  render() {
    const { topicId, user, title, description, is_finished, completed_drill_down, diagnostic_finished, skills, index } = this.props;
    let url = `${API_URL}/${user.current_test.toLowerCase()}/dia/diagnostics/topics/${topicId}/drilldown`
    let sorted_skills = skills.slice().sort(this.compare);
    let { isCollapsed } = this.state;
    let src = (index == 0 || index == 1) ? 'exclaim.png' : 'thumbtack.png'
    return (
      <div className="diagnostic_card_wrapper">
        <div className="skill-card" style={{ backgroundColor: '#fff', border: (index == 0 || index == 1) ? '1px solid #FFDF1A' : 'none'}}>
          <div className="skill-card-left">
            <div className="icon-container">
              <span className="dot" style={{ backgroundColor: (diagnostic_finished && (index == 0 || index == 1)) ? '#FAEE67' : '#5D90E3'}}><div className="question">{
                diagnostic_finished
                  ? <div><img className={(index == 0 || index == 1) ? 'exclaimImage' : 'pinImage'} src={src && require(`../../../../img/${src}`)} /><p className="focus_text" style={index !== 0 && index !== 1 ? {display: 'none'} : {}}>FOCUS</p></div>
                  : <i className="fa fa-lock"></i> }</div></span>
            </div>
            <div className="skill-name-description">
              <div className="skill-name">
                <h4 className="bold">
                  {title}
                </h4>
              </div>
              <div className="skill-description"><p>{description}</p></div>
            </div>
          </div>
          { !isCollapsed && diagnostic_finished ?
            <div className="sorted_skills">
              Our assessment of your skills in this topic. Focus on the weakest first.
               <div className="readiness_header"><span className="readiness_text">READINESS</span><span className="skill_text">SKILL</span></div>
              { sorted_skills && sorted_skills.map((skill, key) => {
                return <div className="readness_content" key={key}><span className="readiness_score_text">{skill.skill_score >= 0 ? `${skill.skill_score}/5` : "0/5"}</span><span className="skill_text">{skill.name}</span></div>
                })
              }
            </div>
              : null
          }
          {
            (diagnostic_finished && completed_drill_down) ?
              <div className="collapse" onClick={(e)=> this.collapseClick(e)}>
                { isCollapsed ? (<p className="expand">Expand for more</p>) : (<p className="collapse">Collapse</p>) }
              </div> : null
          }
          <div className="skill-card-right">
          {
            diagnostic_finished && isCollapsed ?
            <a href={url}>
              <QbButton
                label={ completed_drill_down ? "Retake" : "Drill Down" }
                className="btn btn-primary btn-sm"
                style={{ fontSize: '14px', fontWeight: 'bold', cursor: 'pointer'}}
              />
            </a>
              : null
          }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user.user
  };
}

export default connect(mapStateToProps, null)(DiagnosticTestSubjectCard);
