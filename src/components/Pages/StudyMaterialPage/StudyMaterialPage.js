import React from 'react';
import { connect } from 'react-redux';
import HeaderSection from '../HeaderSection';
import StudyMaterialBodySection from './StudyMaterialBodySection';
import { study_material_content } from '../../../constants/study_material_content';
import { withRouter } from 'react-router-dom';
import {
  studyArticleRequest
} from '../../../actions/studyArticleActions';

class StudyMaterialPage extends React.Component {
  constructor(props) {
    super(props);
    props.studyArticleRequest(props.match.params.study_article_id);
  }

  render() {
    const { study_article } = this.props;
    const content = study_material_content["study_material"]
    let title = content["title"]
    let body_content = content["description"]
    let section_name = study_article.section_name && study_article.section_name.toLowerCase()
    section_name = "readingwriting" ? "reading" : section_name
    return <div>
      <HeaderSection section={ section_name } src={study_article.section_name && `quesbook_${study_article.section_name.toLowerCase()}.png`} title={title} body_content={body_content} />
      <StudyMaterialBodySection study_article={study_article} />
    </div>
  }
};

const actions = {
  studyArticleRequest
}

const mapStateToProps = (state) => {

  return {
    study_article: state.studyArticleReducer.study_article
  };
}

export default withRouter(connect(mapStateToProps, actions)(StudyMaterialPage));
