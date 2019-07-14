import React, { Component } from 'react';
import QbButton from '../QbButton/QbButton';
import './QbPracticeTestCard.scss';
import { NavLink } from 'react-router-dom';

class QbPracticeTestCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { testName, testId, disabled, buttonLabel} = this.props;
    return (
      <div className="test-card">
        <div className="test-name">
          <h4>{`Practice ${testName}`}</h4>
        </div>
        { disabled == true ?
          <QbButton
            label={buttonLabel}
            className="btn btn-primary btn-sm"
            style={{ fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', opacity: '.6', borderColor: '#D7DEC2' }}
            disabled={true}
          />
        :
        <NavLink to={`/diagnostic/practice/${testId}`} className="normal" activeClassName="active" exact>
          <QbButton
            label={buttonLabel}
            className="btn btn-primary btn-sm"
            style={{ fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
            disabled={disabled}
          />
        </NavLink> }
     </div>
    );
  }
}

export default QbPracticeTestCard;
