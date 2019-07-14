import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ArcProgress } from 'react-npm-demo';
import classNames from 'classnames';
import './Circle.scss';
import alarm_clock from '../../../../img/alarm-clock.png'
import { API_URL } from '../../../constants/urls';

class Circle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovering: false
    }
    this.updateState = this.updateState.bind(this)
  }

  updateState(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    const iconClass = classNames('circle_icon', this.props.icon);
    const circleWrapperClass = classNames('circle_wrapper', this.props.wrapper);
    const { label, size, circleData, circleUrl, diagUrl } = this.props;
    const circleSize = parseInt(size);
    const { progress, status, r_time } = circleData;
    let opacity = 0;
    console.log('progress', progress)
    if(progress > 0 && progress < 1){
      opacity = 0.15;
    }else if(progress >= 1){
      opacity = 0.5;
    }
    let test_time = Math.floor(r_time/60)
    let remaining_time;
    if (isNaN(test_time)) {
      remaining_time = `0 mins left`
    } else {
      if ((label == "Reading" && test_time < 20) || ( label !== "Reading" && test_time < 30)) {
        remaining_time = `${test_time} mins left`
      } else {
        remaining_time = `${test_time} mins`
      }
    }
    let nav_url;
    (typeof diagUrl === "undefined") ? (nav_url = '') : (nav_url = diagUrl)
    return (
      <div className={circleWrapperClass} style={{height: `${circleSize}px`}}>
        <div className="circle_bg" style={{height: `${circleSize}px`, width: `${circleSize}px`}}>
          <a href={ this.state.isHovering ? `${API_URL}${nav_url}` : circleUrl } style={{height: `${circleSize}px`, width: `${circleSize}px`}}>
            <div className="circle" style={{
              'backgroundColor': `rgba(185, 207, 243, ${opacity})`,
              height: `${circleSize - 2}px`,
              width: `${circleSize - 2}px`
            }}>
            <ArcProgress
              height={circleSize}
              width={circleSize}
              innerRadius={ circleSize / 2 - 4}
              outerRadius={ circleSize / 2 }
              id={this.props.id}
              backgroundColor="#ffffff"
              foregroundColor="#5d90e3"
              percentComplete={progress}
            />
          </div>
          <div className="circle_label" style={{width: `${circleSize}px`}}>
            <div className={iconClass} />
            <div className="circle_label_content">{label}</div>
            <div className="circle_label_time">
              <i className="fa fa-stopwatch"></i>
              <p>{ remaining_time }</p>
            </div>
            <div className="circle_label_start" onMouseEnter={ () => this.updateState('isHovering', true) } onMouseLeave={ () => this.updateState('isHovering', false) }>{status}</div>
          </div>
        </a>
      </div>
    </div>
    );
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ push }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Circle);
