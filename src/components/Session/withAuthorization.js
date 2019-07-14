import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Spinner from "../UI/Common/Spinner";
import { userRequest } from "../../actions/userActions";

const WithAuthorization = props => {
  if (!props.user) {
    props.userRequest();
  }
  return <div>{props.user ? "Loaded" : <Spinner />}</div>;
};

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = dispatch =>
bindActionCreators({
  userRequest,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithAuthorization);
