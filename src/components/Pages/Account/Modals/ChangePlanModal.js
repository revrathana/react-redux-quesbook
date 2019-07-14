import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { QbAssembledModal } from "../../../Shared/QbModal";
import QbButton from "../../../Shared/QbButton/QbButton";
import { ChangePlan } from "./ChangePlan";
import { updatePlan, userFetchPayments } from "../../../../actions/userActions";

class ChangePlanDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlan: props.payments.last_plan.plan || "1",
      newPlan: props.payments.last_plan.plan || "1"
    };
    this.updateState = this.updateState.bind(this);
  }
  updateState(key, value) {
    this.setState({ [key]: value });
  }
  render() {
    const { close } = this.props;
    const { updateState } = this;
    return (
      <QbAssembledModal
        {...{ close }}
        header="Choose your plan"
        body={
          <ChangePlan
            {...{
              ...this.props,
              ...this.state,
              updateState
            }}
          />
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user.user,
  payments: state.userReducer.user.payments
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updatePlan, userFetchPayments }, dispatch);

export const ChangePlanModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePlanDiv);
