import React from 'react';
import { connect } from 'react-redux';
import MenuBar from '../MenuBar';
import DiagnosticTestHeader from '../DiagnosticTestHeader';
import DiagnosticTestBodySection from '../DiagnosticTestBodySection';
import { bindActionCreators } from 'redux';
import './DiagnosticTestEndCardPage.scss';
import { withRouter } from 'react-router-dom';
import {
  diagnosticSingleRequest
} from '../../../actions/diagnosticActions';

class DiagnosticTestEndCardPage extends React.Component {
  constructor(props) {
    super(props);
    props.diagnosticSingleRequest(props.match.params.section)
  }

  render() {
    let { singleDiagnostic } = this.props;

    return <div>
      <div className="diagnostic_end_card">
        <MenuBar />
        { singleDiagnostic ? <DiagnosticTestHeader diagnostic={singleDiagnostic} /> : null }
        { singleDiagnostic ? <DiagnosticTestBodySection diagnostic={singleDiagnostic} /> : null }
      </div>
    </div>
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ diagnosticSingleRequest }, dispatch);

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user.user,
    singleDiagnostic: state.diagnosticReducer.singleDiagnostic,
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiagnosticTestEndCardPage));
