import React, { Component } from 'react';
import { connect } from 'react-redux';
import QbButton from '../../QbButton/QbButton';
import QbProgressBar from '../../QbProgressBar/QbNextProgressBar';
import './QbSkillCard.scss';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../../../constants/urls';

class QbSkillCard extends Component {
  constructor(props) {
    super(props);
  }

  get ButtonLabel() {
    return this.props.progressPercentage === '0' ? 'Take a Quiz' : 'Start';
  }

  render() {
    const { objType, name, user, definition, skillId, practice_by_skill_url, section, progressPercentage, skillArticleId } = this.props;
    return (
      <div className="skill-card" style={{ backgroundColor: '#fff' }}>
        <div className="skill-card-left">
          <div className="skill-progress">
            <QbProgressBar percentage={progressPercentage} section={section} />
          </div>
          <div className="skill-name-description">
            <div className="skill-name">
              <h4 className="bold">
                { objType == "skill" ?
                  `Practice this skill: ${name}` :
                  `Take A Drill Down Quiz on: ${name}`
                }
              </h4>
            </div>
            <div className="skill-description"><p>{definition}</p></div>
          </div>
        </div>
        <div className="skill-card-right">
          { skillId == 238 ?
            <QbButton
              label={buttonLabel}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', opacity: 0.6, border: '1px solid rgb(215, 222, 194)' }}
              disabled={true} />
            :
            <a href={objType == "skill" ? `${practice_by_skill_url}` : `${API_URL}/${user.current_test.toLowerCase()}/dia/diagnostics/topics/${skillId}/drilldown` } className="normal">
              <QbButton
                label="Start"
                className="btn btn-primary btn-sm"
                style={{ fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
              />
            </a>
          }
          <div className="skill-score">
            <p> </p>
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

export default connect(mapStateToProps, null)(QbSkillCard);
