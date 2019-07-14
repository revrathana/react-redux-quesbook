import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import './DiagnosticTestHeader.scss';
import QbButton from '../../Shared/QbButton/QbButton';
import { API_URL } from '../../../constants/urls';
import {
  diagnosticCreatePdf,
  diagnosticRequest
 } from '../../../actions/diagnosticActions'

class DiagnosticTestHeader extends React.Component {
  constructor(props) {
    super(props);
    props.diagnosticRequest();
  }

  capitalizeName(item) {
    if (item == "readingwriting") {
      return "Reading & Writing"
    } else {
      return item.charAt(0).toUpperCase() + item.slice(1);
    }
  }

  servePdf(e) {
    this.props.diagnosticCreatePdf()
  }

  checkDiagnostic(diagnostic) {
    return diagnostic.part1_finished == true
  }

  render() {
    let { diagnostics, user } = this.props;
    let showReport;
    if (user.current_test == "ACT") {
      showReport = false
    } else {
      showReport = diagnostics.every(this.checkDiagnostic)
    }
    let subjectParam = this.props.match.params.section;
    let testNameParam = this.props.match.params.test;
    let testName = this.capitalizeName(testNameParam);
    let subjectName = this.capitalizeName(subjectParam);
    let diagnostic = this.props.diagnostic;
    let button_label = (diagnostic.diagnostics_progress > 0 && diagnostic.diagnostics_progress < 100) ? "Continue Diagnostic" : "Start Diagnostic"

    return <div className="diag_test_header">
      <p className="prac_text_header"><span>{testName} </span>{`${subjectName} Diagnostic`}</p>
      {  showReport == true ?
        <span className="download_report">
          <a style={{color: '#000000'}} onClick={(e) => this.servePdf(e)} target="_blank"><i className="fas fa-print fa-2x" style={{color: '#000000', cursor: 'pointer'}}></i><div style={{cursor: 'pointer'}}>Print Diagnostic<br/>Summary</div></a>
        </span>
          : null
      }
      <p className={ showReport == true ? 'composite_icon' : 'composite'}>Benchmark<br/> Score</p>
        { diagnostic.part1_finished ?
          <span className="blueDot"><div className="scoreText">{testNameParam == "act" ? diagnostic.act_score : diagnostic.sat_score }</div></span>
            :
          <img src={require(`../../../../img/lock.png`)} />
        }
        <div className="diag_btn">
          <a href={`${API_URL}/${this.props.match.params.test}/dia/diagnostics/start?section=${subjectParam}`}>
            <QbButton
              label={ diagnostic.part1_finished ? "Retake Diagnostic" : button_label }
              className="btn btn-sm diag"
              style={{ backgroundColor: '#FFFFFF', color: '#192230', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', width: '163px', border: '1px solid', marginBottom: '10px'}}
            />
          </a>
        </div>
      <div className="topic-name">
        <h4>Topics</h4>
        <p className="complete">Once you have taken the diagnostic, you will be able to see at a glance where you stand on all the topics evaluated in this section and have the ability to drilldown per topic to pinpoint your areas of opportunity</p>
      </div>
    </div>
  }
};

const actions = {
  diagnosticCreatePdf,
  diagnosticRequest
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user.user,
    diagnostics: state.diagnosticReducer.studyPlanSections,
  };
}

export default withRouter(connect(mapStateToProps, actions)(DiagnosticTestHeader));
