import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userFetchPayments } from "./../../../../actions/userActions.js";
import {
  ChangePlanModal,
  CancelPlanModal,
  UpdatePaymentModal,
  CancellationPolicyModal,
} from "../Modals";

class PaymentInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalName: "cancellationPolicy",
    };
    this.getModal = this.getModal.bind(this);
    this.setAndShowModal = this.setAndShowModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentWillMount() {
    if (!this.props.payments) {
      this.props.userFetchPayments();
    }
  }
  componentDidUpdate() {
    if (!this.props.payments) {
      this.props.userFetchPayments();
    }
  }
  getPlan(plan) {
    if (plan === "1") {
      return "Monthly Pass";
    } else if (plan === "3") {
      return "Three-Month Pass";
    } else if (plan === "1Y") {
      return "One-Year Pass";
    } else if (plan === "L") {
      return "Quesbook Ultimate Genius Lifetime Pass";
    } else if (plan === "S") {
      return "School Account";
    } else {
      return "No Plan";
    }
  }
  formatDate(dateString) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "September",
      "October",
      "November",
      "December",
    ];
    const [year, month, day] = dateString.split("-");
    return `${months[parseInt(month, 10) - 1]} ${day}, ${year}`;
  }
  getModal(name) {
    const { user, payments, userFetchPayments } = this.props;
    switch (name) {
      case "changePlan":
        return <ChangePlanModal close={this.closeModal} />;
      case "cancelPlan":
        return <CancelPlanModal close={this.closeModal} />;
      case "updatePayment":
        return <UpdatePaymentModal close={this.closeModal} />;
      case "cancellationPolicy":
        return <CancellationPolicyModal close={this.closeModal} />;
    }
  }
  setAndShowModal(name) {
    this.setState({
      showModal: true,
      modalName: name,
    });
  }
  closeModal() {
    this.setState({ showModal: false });
  }
  render() {
    const { showModal, modalName } = this.state;
    const { user, payments } = this.props;
    const { getPlan, formatDate, getModal, setAndShowModal, closeModal } = this;
    const planExpDate = payments
      ? new Date(payments.last_plan.expiration_date)
      : null;
    const today = new Date();
    return (
      <div>
        <h5 className="account-section-h5">Payment Info</h5>
        {!payments ? null : (
          <div className="account-section-div">
            <h5 className="account-section-h5">Plans</h5>
            <div className="account-section-row">
              <div className="account-section-col-left">
                {getPlan(payments.last_plan.plan)}
              </div>
              <div className="account-section-col-right">
                <a onClick={() => setAndShowModal("changePlan")}>Change Plan</a>
                <a onClick={() => setAndShowModal("cancelPlan")}>Cancel</a>
              </div>
            </div>
          </div>
        )}
        {!payments ? null : (
          <div className="account-section-div">
            <h5 className="account-section-h5">Payment</h5>
            <div className="account-section-row">
              <div className="account-section-col-left">
                <span>
                  {payments.last_plan.card_type +
                    " ************" +
                    payments.last_plan.card_number}
                </span>
                <p style={{ marginTop: "10px" }}>
                  {user.status === "lapsed" && payments.last_plan.plan !== "C"
                    ? [
                        <span
                          key="lapsed-account-notice"
                          style={{ color: "#CF2112" }}
                        >{`Account Expired on ${formatDate(
                          payments.last_plan.expiration_date
                        )}.`}</span>,
                        <br key="br" />,
                        <span key="lapsed-account-span">{`
                          Please make another payment to continue using your account.`}</span>,
                      ]
                    : null}
                  {user.status !== "lapsed" && payments.last_plan.plan === "C"
                    ? `Current plan will expire on ${formatDate(
                        payments.last_plan.expiration_date
                      )}`
                    : null}
                  {user.status !== "lapsed" && payments.last_plan.plan !== "C"
                    ? `Next payment is scheduled for ${formatDate(
                        payments.last_plan.expiration_date
                      )}`
                    : null}
                </p>
              </div>
              <div className="account-section-col-right">
                <a onClick={() => setAndShowModal("updatePayment")}>Update</a>
              </div>
            </div>
          </div>
        )}
        <span className="account-cancellation-notice">
          Click{" "}
          <a onClick={() => setAndShowModal("cancellationPolicy")}>here</a> to
          see the cancellation policy
        </span>
        {!showModal ? null : getModal(modalName)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user.user,
  payments: state.userReducer.user.payments,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ userFetchPayments }, dispatch);

export const PaymentInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentInfoComponent);
