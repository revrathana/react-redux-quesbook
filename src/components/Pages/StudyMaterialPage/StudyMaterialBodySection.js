import React from 'react';
import { connect } from 'react-redux';
import './StudyMaterialPage.scss';
import renderMathInElement from '../../../constants/renderMathInElement';
import MenuBar from '../MenuBar';

class StudyMaterialPage extends React.Component {
  renderArticle(article) {
    if (article && article.id > 0) {
      return (
        <div className="section-studymat">
          <h2 className="article-title" dangerouslySetInnerHTML={{ __html: article.title }} />
          <div className="article-content"
            dangerouslySetInnerHTML={{
              __html: article.content
            }}
            ref={(node) => {
              node && renderMathInElement(node);
            }}
          />
        </div>
      );
    }
  }

  render() {
    const { study_article, section } = this.props;

    return <div>
      <div className="body-content studyMatArticleContainer justify-content-center">
        <div className="studyMatArticle">
          {this.renderArticle(study_article)}
        </div>
      </div>
    </div>
  }
}

const actions = {
}

const mapStateToProps = (state) => {
  return {
  };
}

export default connect(mapStateToProps, actions)(StudyMaterialPage);
