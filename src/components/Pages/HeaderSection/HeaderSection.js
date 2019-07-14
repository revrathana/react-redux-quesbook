import React from 'react';
import { connect } from 'react-redux';
import './HeaderSection.scss';
import MenuBar from '../MenuBar';
import HeroSection from '../HeroSection';

class HeaderSection extends React.Component {
  render() {
    const { src, title, body_content, section } = this.props;
    return <div className="info_section">
      <div className="info_section_container">
        <MenuBar />
        <HeroSection { ... {src, title, body_content, section} } />
      </div>
    </div>
  }
};

const actions = {}

const mapStateToProps = (state) => {

  return {
  };
}

export default connect(mapStateToProps, actions)(HeaderSection);
