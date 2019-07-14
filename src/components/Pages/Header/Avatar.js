import React, { Component } from "react";
import "./Avatar.css";
import AvatarMenu from "./AvatarMenu.js";

export default class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false
    };
    this.updateState = this.updateState.bind(this);
  }
  updateState(key, value) {
    this.setState({ [key]: value });
  }
  render() {
    let {user} = this.props;
    const { isHovered } = this.state;
    const { updateState } = this;
    let name_icon = (user.first_name && user.first_name.charAt(0).toLowerCase()) || "A"
    return (
      <div
        ref="hoverElement"
        className="styleMain styleSize"
        onMouseEnter={() => this.setState({ isHovered: true })}
      >
        <span>{name_icon}</span>
        {isHovered ? <AvatarMenu {...{ isHovered, updateState }} /> : null}
      </div>
    );
  }
}
