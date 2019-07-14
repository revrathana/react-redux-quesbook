import React from 'react';
import { connect } from 'react-redux';
import './HeroSection.scss';

class HeroSection extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    const { section, src, title, body_content } = this.props;
    return <div className={`${section}_header header`}>
      <div className={`${section}_image image`}>
        <img src={src && require(`../../../../img/${src}`)} />
      </div>
      <div className={`${section}_content content`}>
        <div className={`${section}_title title`}>
          <h3>{title}</h3>
        </div>
        <div className={`${section}_description description`}>
          <p>{body_content}</p>
        </div>
      </div>
    </div>
  }
}

const actions = {}


const mapStateToProps = (state) => {
  return {
  };
}

export default connect(mapStateToProps, actions)(HeroSection);
