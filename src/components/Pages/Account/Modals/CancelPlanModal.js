import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { QbAssembledModal } from "../../../Shared/QbModal";
import QbButton from "../../../Shared/QbButton/QbButton";
import "./CancelPlanModal.css";
import { FeedbackPage } from "./FeedbackPage";
import {
  cancelPlan,
  submitFeedback,
  userFetchPayments
} from "../../../../actions/userActions";

class CancelPlanDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: "first",
      cancellationReason: "",
      otherDescriptionValue: ""
    };
    this.updateState = this.updateState.bind(this);
  }
  updateState(key, value) {
    this.setState({ [key]: value });
  }
  render() {
    const { close, type } = this.props;
    const { modalState } = this.state;
    const { updateState } = this;
    const bodyContent = [
      <span key="cancel-text">
        {`Cancellation will take effect at the end of your current billing period on
      April 14, 2020. Restart your membership at any time. All of your tests and
      profile data will be remembered for one year.`}
      </span>,
      <QbButton
        key="cancel-button"
        label="Continue"
        className="btn dark alternate btn-lg"
        style={{
          width: "75%",
          margin: "50px auto 0px auto",
          backgroundColor: "#203a62"
        }}
        clickHandler={() => {
          this.setState({ modalState: "second" });
        }}
      />
    ];
    return modalState === "first" ? (
      <QbAssembledModal
        {...{ close, type }}
        header="Cancel Plan"
        body={bodyContent}
      />
    ) : (
      <FeedbackPage {...{ ...this.props, ...this.state, updateState }} />
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user.user,
  payments: state.userReducer.user.payments
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { cancelPlan, submitFeedback, userFetchPayments },
    dispatch
  );

export const CancelPlanModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(CancelPlanDiv);
