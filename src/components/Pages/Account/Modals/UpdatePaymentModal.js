import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
var creditcard = require("creditcard");
var creditCardType = require("credit-card-type");
import { QbAssembledModal } from "../../../Shared/QbModal";
import {
  PayButton,
  CardHolderInput,
  CreditCardInput,
  DatePickerAndCVCInput,
} from "./modal-components";
import {
  userUpdatePaymentSource,
  userFetchPayments,
} from "../../../../actions/userActions";

const paymentDiv = props => {
  return (
    <div>
      {props.updateComplete ? (
        <div>Update Complete</div>
      ) : (
      [
        <CardHolderInput
          key="CardHolderInput"
          changeHandler={props.handleChange.bind(this, "cardHolder")}
          value={props.cardHolder}
        />,
        <CreditCardInput
          key="CreditCardInput"
          changeHandler={props.handleChange.bind(this, "creditCardNumber")}
          value={props.creditCardNumber}
          cardType={props.creditCardType}
          isValid={props.isCreditCardValid}
        />,
        <DatePickerAndCVCInput
          key="DatePickerAndCVCInput"
          CVCChangeHandler={props.handleChange.bind(this, "CVC")}
          CVCValue={props.CVC}
          singleDate={props.enrollDate}
          dateChangeHandler={props.handleChange.bind(this, "enrollDate")}
          isCVCValid={props.isCVCValid}
          isDateValid={props.isDateValid}
        />,
        <PayButton
          key="PayButton"
          clickHandler={props.handleUpdate}
          disabled={!props.isAbleToPay}
        />,
      ]
      )}
    </div>
  );
};

export class UpdatePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreditCardInputInitialState: true,
      isCVCInputInitialState: true,
      isDateInputInitialState: true,
      cardHolder: "",
      creditCardNumber: "",
      creditCardType: "",
      CVC: "",
      enrollDate: "",
      finalCoursePrice: "",
      updateComplete: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.checkCVCValid = this.checkCVCValid.bind(this);
  }
  componentWillMount() {
    if (!this.props.cardData) {
      // get data
    }
  }
  componentDidUpdate() {
    if (!this.props.cardData) {
      // get data
    }
  }

  get isAbleToPay() {
    return this.isCreditCardValid && this.isCVCValid && this.isDateValid;
  }
  handleUpdate() {
    const payload = {
      credit_card: {
        cardholder_name: this.state.cardHolder,
        card_number: this.state.creditCardNumber,
        card_type: this.state.creditCardType,
        exp_date: this.state.enrollDate.replace("/", ""),
        cvv: this.state.CVC,
      },
    };
    this.props.userUpdatePaymentSource(payload);
    this.setState({ uploadComplete: true });
    this.props.close();
  }
  handleChange(type, val) {
    var updateObj = { [type]: val };
    if (type === "creditCardNumber") {
      updateObj = {
        ...updateObj,
        creditCardType: creditcard.cardscheme(val),
        isCreditCardInputInitialState: false,
      };
    } else if (type === "CVC") {
      updateObj = {
        ...updateObj,
        isCVCInputInitialState: false,
      };
    } else if (type === "enrollDate") {
      updateObj = {
        ...updateObj,
        isDateInputInitialState: false,
      };
    }
    this.setState(updateObj);
  }
  get isCreditCardValid() {
    if (this.state.isCreditCardInputInitialState) {
      return true;
    }
    const isValid = creditcard.validate(this.state.creditCardNumber);
    return isValid;
  }
  get isCVCValid() {
    if (this.state.isCVCInputInitialState) {
      return true;
    }
    return this.checkCVCValid();
  }
  get isDateValid() {
    if (this.state.isDateInputInitialState) {
      return true;
    }
    return /^(0[1-9]|1[0-2])\/\d{2}/.test(this.state.enrollDate);
  }
  checkCVCValid() {
    const firstTwoDigits = this.state.creditCardNumber.substring(0, 2);
    const cvcLength = ["34", "37"].includes(firstTwoDigits) ? 4 : 3;
    const rgx = new RegExp(`^\\d{${cvcLength}}$`);
    const isCVCValid = rgx.test(this.state.CVC);
    return isCVCValid;
  }

  render() {
    const { close, type } = this.props;
    const {
      handleChange,
      handleUpdate,
      isAbleToPay,
      isCreditCardValid,
      isCVCValid,
      isDateValid,
    } = this;
    return (
      <QbAssembledModal
        {...{ close }}
        header="Payment Info"
        body={paymentDiv({
          ...{
            ...this.props,
            ...this.state,
            handleChange,
            handleUpdate,
            isCreditCardValid,
            isCVCValid,
            isDateValid,
            isAbleToPay,
          },
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  cardData: state.userReducer.user.cardData,
});

const mapDispatchToProps = dispatch =>
bindActionCreators({ userUpdatePaymentSource, userFetchPayments }, dispatch);

export const UpdatePaymentModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePayment);
