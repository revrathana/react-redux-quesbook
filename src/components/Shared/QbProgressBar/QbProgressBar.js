import React, { Component } from "react";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import './QbProgressBar.css';
import { skill_card_content } from '../../../constants/skill_card_content'; 

class QbProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { percentage, score, diagnosticLatest } = this.props
    let opacity = '1'
    if(percentage =='0') opacity = '0.7'
    return (
      <div>
        <div className="QbProgressBar" style={{opacity: opacity}}>
          <div style={{ position: "relative" }}>
            <CircularProgressbar percentage={percentage} />
          </div>
          { (score >= 0 && diagnosticLatest == false) ?
            (<div className="icon-container" style={{top: '23px'}}>
              <span className="level">LEVEL</span>
              <span className="level_score">{ score }</span>
            </div>)
         :
          (<div className="icon-container">
            <span className="dot"><div className="question"><i className="fa fa-lock"></i></div></span>
          </div>)
          }
        </div>
      </div>
    );
    }
  }

  export default QbProgressBar;
