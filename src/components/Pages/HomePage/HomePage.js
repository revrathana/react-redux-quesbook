import React from "react";
import { connect } from "react-redux";
import HeaderSection from "../HeaderSection";
import HomeBodySection from "./HomeBodySection";
import { header_content } from "../../../constants/header_content";
import "./HomePage.scss";

class HomePage extends React.Component {
  render() {
    const content = header_content["home"];
    let src = content["image"];
    let title = content["title"];
    let body_content = content["description"];
    return (
      <div>
        <HeaderSection
          src={src}
          title={title}
          section="home"
          body_content={body_content}
        />
        <HomeBodySection section="home" />
      </div>
    );
  }
}

const actions = {};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  actions
)(HomePage);
