import React, {Component} from 'react';
import './QbHighlight.scss';

// props:  content, style
// Example
// <span style={{'fontSize': '48px'}}>
//     <QbHighlight content="Analysis" styleHL={{'margin': '-15px -10px', 'width': '120%'}}></QbHighlight>
// </span>
// <h1>
//     My StudyPlan <QbHighlight content="Quesbook Web"></QbHighlight>
// </h1>
class QbHighlight extends Component {
    render() {
        return (
            <mark style={this.props.style}>{this.props.content}</mark>
        );
    }
}

export default QbHighlight;
