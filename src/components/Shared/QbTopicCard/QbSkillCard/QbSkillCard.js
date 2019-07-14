import React, { Component } from 'react';
import { connect } from 'react-redux';
import QbButton from '../../QbButton/QbButton';
import QbProgressBar from '../../QbProgressBar/QbProgressBar';
import './QbSkillCard.scss';
import { API_URL } from '../../../../constants/urls';

class QbSkillCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, diagnosticLatest, skillId, skillName, section, topicId, skillDescription, score } = this.props;
    let url = (score >= 0 && diagnosticLatest == false) ? `/start_new/#/${section}/skill/${skillId}` : `${API_URL}/${user.current_test.toLowerCase()}/dia/diagnostics/topics/${topicId}/drilldown`
    let buttonLabel = (score >= 0 && diagnosticLatest == false) ? "Study" : "Take Quiz"
    return (
      <div className="skill-card" style={{ backgroundColor: '#fff' }}>
        <div className="skill-card-left">
          <div className="skill-progress">
            <QbProgressBar percentage="100" score={score} diagnosticLatest={diagnosticLatest} />
          </div>
          <div className="skill-name-description">
            <div className="skill-name">
              <h4 className="bold">
                  {skillName}
              </h4>
            </div>
            <div className="skill-description"><p>{skillDescription}</p></div>
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
            <a href={url} className="normal">
              <QbButton
                label={buttonLabel}
                className="btn btn-primary btn-sm"
                style={{ fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
                disabled={ skillId == 238 ? true : false }
              />
            </a>
          }
          <div className="skill-score">
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
