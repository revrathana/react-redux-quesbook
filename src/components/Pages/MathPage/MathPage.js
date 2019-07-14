import React from 'react';
import { connect } from 'react-redux';
import HeaderSection from '../HeaderSection';
import SubjectBodySection from '../SubjectBodySection';
import { header_content } from '../../../constants/header_content';

class MathPage extends React.Component {
  render() {
    const content = header_content["math"]
    let src = content["image"]
    let title = content["title"]
    let body_content = content["description"]
    let { user } = this.props;
    return <div>
      <HeaderSection src={src} title={title} section="math" body_content={body_content} />
      <SubjectBodySection section_id={ user.current_test == "ACT" ? 2 : 5 } />
    </div>
  }
}; 

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user.user
  };
}

export default connect(mapStateToProps, null)(MathPage);
