import React, { Component } from 'react';
import QbButton from '../../Shared/QbButton/QbButton';
import './PracticeTestSubjectCard.scss';

class PracticeTestSubjectCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { src, title, description, url, progress, score } = this.props;
    return (
      <div className="plan-card" style={{ backgroundColor: '#fff' }}>
        <div className="plan-card-left">
          <div className="icon-container">
            <img src={src && require(`../../../../img/${src}`)} />
          </div>
          <div className="plan-name-description">
            <div className="plan-name">
              <h4 className="bold">
                {title}
              </h4>
            </div>
            <div className="plan-content">{ (Number(progress) == 100) ? <p>Your Score: { score }</p> : <p style={{color: '#333'}}>Complete this section to get your score</p>}<p>{description}</p></div>
          </div>
        </div>
          { (Number(progress) == 100) ?
          <div className="plan-card-right">
            <a href={url}>
              <QbButton
                label="Retake"
                className="btn btn-primary btn-sm"
                style={{ fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', width: '163px', marginRight: '30px'}}
              />
            </a>
          </div> :
          <div className="plan-card-right">
            <a href={url}>
              <QbButton
                label={(Number(progress) == 0) ? "Start" : "Resume" }
                className="btn btn-primary btn-sm"
                style={{ fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', width: '163px', marginRight: '30px'}}
              />
            </a>
          </div>
          }
      </div>
    );
  }
}

export default PracticeTestSubjectCard;
