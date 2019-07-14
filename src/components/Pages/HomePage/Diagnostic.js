import React from "react";
import { connect } from "react-redux";
import "./HomeBodySection.css";
import "./Diagnostic.scss";
import types from "../../../actions/types";
import Circle from "../../UI/Circle/Circle";
import { fn_GetFinalTestState } from "../../../util/helpers";

class Diagnostic extends React.Component {
  constructor(props) {
    super(props);
  }

  getSectionDiagnosticData(section, studyPlanSections) {
    let progress = 0.0;
    let status;
    let r_time;
    let url;
    if (Array.isArray(studyPlanSections.diagnostic)) {
      const sectionValue = studyPlanSections.diagnostic.filter(
        item => item.name === section
      );
      if (sectionValue.length > 0) {
        const {
          name,
          part1_answered_questions,
          part1_finished,
          diagnostics_progress,
          remaining_time,
          d_test_url,
        } = sectionValue[0];
        const part1obj = {
          answered_questions: part1_answered_questions,
          finished: part1_finished,
        };
        progress = Number.parseFloat(diagnostics_progress / 50);
        status = fn_GetFinalTestState(part1obj, name).forGetStarted;
        if (part1_finished === true) {
          r_time = "";
        } else {
          if (remaining_time) {
            r_time = remaining_time;
          } else {
            if (name == "Reading" || name == "ReadingWriting") {
              r_time = 1200;
            } else {
              r_time = 1800;
            }
          }
        }
        url = d_test_url;
      }
    }

    return {
      progress,
      status,
      r_time,
      url,
    };
  }

  render() {
    let visible = false;
    const diagnostic = this.props;
    let studyPlanSections = diagnostic;
    let currentTest = this.props.user.current_test;
    let size = window.innerWidth > 1024 ? '230' : '150';

    return (
      <div className="chart_wrapper">
        <div className="left_col chart" />
        <div
          className="center_col chart"
          style={currentTest === "SAT" ? { flex: 4 } : {}}
        >
          <div className="topic-name">
            <h4>Overview</h4>
            <div className="topic_header">
              <p>
                For each section of the test, we estimate your score; the more
                you practice, the more accurate your estimate will become. But
                before any of that can be done, you need to complete your
                diagnostic tests.
              </p>
            </div>
          </div>
          {currentTest === "ACT" ? (
            <div className="circle_group_wrapper">
              <Circle
                id={"id-arc01"}
                circleUrl={"/start_new/#/act/diagnostic/english/1"}
                diagUrl={"/act/dia/diagnostics/start?section=English"}
                circleData={this.getSectionDiagnosticData(
                  "English",
                  studyPlanSections
                )}
                icon={"icon_english"}
                label={"English"}
                size={size}
              />
              <Circle
                id={"id-arc02"}
                circleUrl={"/start_new/#/act/diagnostic/reading/2"}
                diagUrl={"/act/dia/diagnostics/start?section=Reading"}
                circleData={this.getSectionDiagnosticData(
                  "Reading",
                  studyPlanSections
                )}
                icon={"icon_reading"}
                label={"Reading"}
                size={size}
              />
              <Circle
                id={"id-arc03"}
                circleUrl={"/start_new/#/act/diagnostic/math/3"}
                diagUrl={"/act/dia/diagnostics/start?section=Math"}
                circleData={this.getSectionDiagnosticData(
                  "Math",
                  studyPlanSections
                )}
                icon={"icon_math"}
                label={"Math"}
                size={size}
              />
              <Circle
                id={"id-arc04"}
                circleUrl={"/start_new/#/act/diagnostic/science/4"}
                diagUrl={"/act/dia/diagnostics/start?section=Science"}
                circleData={this.getSectionDiagnosticData(
                  "Science",
                  studyPlanSections
                )}
                icon={"icon_science"}
                label={"Science"}
                size={size}
              />
            </div>
          ) : (
            <div className="circle_group_wrapper">
              <Circle
                id={"id-arc01"}
                circleUrl={"/start_new/#/sat/diagnostic/math/5"}
                diagUrl={"/sat/dia/diagnostics/start?section=Math"}
                circleData={this.getSectionDiagnosticData(
                  "Math",
                  studyPlanSections
                )}
                icon={"icon_math"}
                label={"Math"}
                size={size}
              />
              <Circle
                id={"id-arc02"}
                circleUrl={"/start_new/#/sat/diagnostic/readingwriting/6"}
                diagUrl={"/sat/dia/diagnostics/start?section=ReadingWriting"}
                circleData={this.getSectionDiagnosticData(
                  "ReadingWriting",
                  studyPlanSections
                )}
                icon={"icon_reading"}
                label={"Reading"}
                size={size}
              />
            </div>
          )}
        </div>
        <div className="right_col chart" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    diagnostic: state.diagnosticReducer.studyPlanSections,
    user: state.userReducer.user.user,
  };
};

export default connect(mapStateToProps, null)(Diagnostic);
