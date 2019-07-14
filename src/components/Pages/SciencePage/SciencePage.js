import React from 'react';
import { connect } from 'react-redux';
import HeaderSection from '../HeaderSection';
import SubjectBodySection from '../SubjectBodySection';
import { header_content } from '../../../constants/header_content';

class SciencePage extends React.Component {
  render() {
    const content = header_content["science"]
    let src = content["image"]
    let title = content["title"]
    let body_content = content["description"]
    return <div>
      <HeaderSection src={src} title={title} section="science" body_content={body_content} />
      <SubjectBodySection section_id="4" />
    </div>
  }
};

const actions = {}

const mapStateToProps = (state) => {

  return {
  };
}

export default connect(mapStateToProps, actions)(SciencePage);
