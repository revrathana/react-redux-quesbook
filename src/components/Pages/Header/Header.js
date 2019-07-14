import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";
import UserMenu from "./UserMenu";
import Brand from "./Brand";
import Avatar from "./Avatar";
import { snakeToCamelParams } from "../../../util/helpers";
import "./Header.scss";
import { updateUserSetting } from "../../../actions/userActions";
import { dismissBanner } from "../../../actions/bannerActions";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser() {
    this.props.updateUserSetting(this.props.user);
  }

  render() {
    const { user, push, dismissBanner } = this.props;
    const banner = this.props.banner;
    return (
      <header>
        {banner ? (
          <div className="banner_wrapper">
            <p>
              Welcome to the brand new Quesbook! We think you’ll love it. Got any questions? Email help@quesbook.com
              {" "}<a onClick={dismissBanner}>dismiss this banner</a>
            </p>
          </div>
        ) : null}
        <nav className="navbar navbar-default" role="navigation">
          <div className="header-flex">
            <Brand {...{ push }} />
            <span className="current_test">{user.current_test}</span>
            <Avatar ref="avatar" user={user} size="big" />
          </div>
        </nav>
      </header>
    );
  }
}

const actions = dispatch =>
  bindActionCreators(
    {
      dismissBanner,
      updateUserSetting,
      push,
    },
    dispatch
  );

function mapStateToProps(state) {
  return {
    user: state.userReducer.user.user,
    banner: state.bannerReducer.banner,
  };
}

export default connect(
  mapStateToProps,
  actions
)(Header);
