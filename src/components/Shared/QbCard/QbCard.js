import React, { Component } from 'react';
import QbButton from '../QbButton/QbButton';
import './QbCard.scss';

class QbCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { src, title, button_label, description, url, button_disabled } = this.props;
    return (
      <div className="plan-card" style={{ backgroundColor: '#fff' }}>
        <div className="plan-card-left">
          <div className="icon-container">
            <img src={require(`../../../../img/${src}`)} />
          </div>
          <div className="plan-name-description">
            <div className="plan-name">
              <h4 className="bold" style={{ fontSize: '15px'}}>
                {title}
              </h4>
            </div>
            <div className="plan-description"><p style={{ fontSize: '15px'}}>{description}</p></div>
          </div>
        </div>
        <div className="plan-card-right">
          { button_disabled ?
            <QbButton
              label={button_label}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', opacity: 0.6, border: '1px solid rgb(215, 222, 194)' }}
              disabled={true} />
            : <a href={url}>
                <QbButton
                  label={button_label}
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: '14px', fontWeight: 'bold', cursor: 'pointer'}} />
              </a>
          }
        </div>
      </div>
    );
  }
}

export default QbCard;
