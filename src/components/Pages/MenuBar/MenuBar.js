import React from "react";
import { connect } from "react-redux";
import "./MenuBar.scss";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

class MenuBar extends React.Component {
  render() {
    let { user } = this.props;
    const isActive = (path, match) => {
      return this.props.match.params.section == path ||
        this.props.match.path.indexOf(path) >= 0
        ? true
        : false;
    };
    // prettier-ignore
    return <div className="menu">
      { user.current_test == "ACT" ?
      <ul className="nav navbar-nav">
        <li key="1"><NavLink to="/home" className="normal" activeClassName="active" isActive={isActive.bind(this, 'home')} exact>Home</NavLink></li>
        <li key="2"><NavLink to="/math" className="normal" activeClassName="active" isActive={isActive.bind(this, 'math')} exact>Math</NavLink></li>
        <li key="3"><NavLink to="/english" className="normal" activeClassName="active" isActive={isActive.bind(this, 'english')} exact>English</NavLink></li>
        <li key="4"><NavLink to="/reading" className="normal" activeClassName="active" isActive={isActive.bind(this, 'reading')}exact>Reading</NavLink></li>
        <li key="5"><NavLink to="/science" className="normal" activeClassName="active"  isActive={isActive.bind(this, 'science')} exact>Science</NavLink></li>
      </ul> :
      <ul className="nav navbar-nav">
        <li key="1"><NavLink to="/home" className="normal" activeClassName="active" isActive={isActive.bind(this, 'home')} exact>Home</NavLink></li>
        <li key="2"><NavLink to="/math" className="normal" activeClassName="active" isActive={isActive.bind(this, 'math')} exact>Math</NavLink></li>
        <li key="4"><NavLink to="/readingwriting" className="normal" activeClassName="active" isActive={isActive.bind(this, 'readingwriting')} exact>Reading</NavLink></li>
      </ul>
      }
    </div>
  }
}

const actions = {};

const mapStateToProps = state => {
  return {
    user: state.userReducer.user.user,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(MenuBar)
);
