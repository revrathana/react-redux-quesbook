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
    const { percentage, section } = this.props
    let content = skill_card_content[section]
    let src = content["image"]
    let opacity = '1'
    if(percentage =='0') opacity = '0.7'
    return (
      <div className="QbProgressBar" style={{opacity: opacity}}>
        <div style={{ position: "relative" }}>
          <CircularProgressbar percentage={percentage} />
        </div>
        <div className="icon-container" style={{top: '18px'}}>
          <img src={require(`../../../../img/${src}`)} />
        </div>
      </div>
    );
  }
}

export default QbProgressBar;
