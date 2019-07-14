import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as routes from "../../../../constants/routes";
import MenuBar from "../../MenuBar";
import { AccountNav } from "./AccountNav";
import { QbAssembledModal } from "../../../Shared/QbModal";
import { LapsedPaymentModal } from "../Modals/LapsedPaymentModal";
import { TrialExpiredPaymentModal } from "../Modals/TrialExpiredPaymentModal";
import "./Account.css";

class AccountTemplateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }
  componentWillMount() {
    if (this.props.user && this.props.user.status !== "active") {
      this.setState({ showModal: true });
    }
  }
  render() {
    const { user, location, push } = this.props;
    const { showModal } = this.state;
    const { updateState } = this;
    const close = () =>
      this.setState({ showModal: false, hasClosedModal: true });
    return (
      <div>
        <div className="menu-bar">
          <MenuBar />
        </div>
        <div className="subject-body">
          <div className="account-body-section">
            <AccountNav {...{ location, push }} />
            <div className="account-body">{this.props.children}</div>
            { showModal ? (
              this.props.user.status === "lapsed" ?
                (
                <QbAssembledModal
                  {...{ close }}
                  header="Payment Lapsed"
                  body={<LapsedPaymentModal {...{ push }} />}
                />)
                  :
                <QbAssembledModal
                  {...{ close }}
                  header="Free Trial Expired"
                  body={<TrialExpiredPaymentModal {...{ push }} />}
                />
              )
              : null }
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.userReducer.user.user,
  location: state.router.location.pathname,
});

const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);

export const AccountTemplate = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountTemplateComponent);
