import React from 'react';
import { connect } from 'react-redux';
import HeaderSection from '../HeaderSection';
import SubjectBodySection from '../SubjectBodySection';
import { header_content } from '../../../constants/header_content';

class ReadingPage extends React.Component {
  render() {
    let { user } = this.props;
    let content_subject = user.current_test == "ACT" ? "reading" : "readingwriting"
    const content = header_content[content_subject]
    let src = content["image"]
    let title = content["title"]
    let body_content = content["description"]
    return <div>
      <HeaderSection src={src} title={title} section="reading" body_content={body_content} />
      <SubjectBodySection section_id={ user.current_test == "ACT" ? 3 : 6 } />
    </div>
  }
};

const mapStateToProps = (state) => {

  return {
    user: state.userReducer.user.user
  };
}

export default connect(mapStateToProps, null)(ReadingPage);
