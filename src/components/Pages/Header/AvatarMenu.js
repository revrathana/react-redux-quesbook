import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as routes from "./../../../constants/routes";
import { push } from "connected-react-router";
import {
  updateCurrentTest,
  userSignOut,
} from "./../../../actions/userActions.js";
import "./AvatarMenu.css";

const AvatarMenu = props => {
  const {
    isHovered,
    updateState,
    updateCurrentTest,
    userSignOut,
    user,
    push,
  } = props;
  const tests = [["ACT", "#"], ["SAT", "#"]];
  function changeTest(testName) {
    updateCurrentTest(testName);
    push("/")
  }
  function signOut() {
    userSignOut(user);
    push("/");
  }
  return (
    <div className="hoverFillerSection">
      <div
        className="avatarMenu"
        onMouseEnter={() => updateState("isHovered", true)}
        onMouseLeave={() =>
          setTimeout(() => updateState("isHovered", false), 200)
        }
      >
        <div className="avatarMenuOptions">
          <span className="avatarMenuTitle">My tests</span>
          <a onClick={() => changeTest("ACT")}>ACT</a>
          <a onClick={() => changeTest("SAT")}>SAT</a>
        </div>
        <hr />
        <div className="avatarMenuOptions">
          <a onClick={() => push(routes.ACCOUNT_PROFILE)}>My Account</a>
          <a onClick={() => signOut()}>Log out</a>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  user: state.userReducer.user.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateCurrentTest, userSignOut, push }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvatarMenu);
