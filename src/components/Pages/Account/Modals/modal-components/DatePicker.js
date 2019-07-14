import React from "react";
import { QbDatePicker } from "quesbook-component/lib/QbDatePicker";
import { QbInput } from "quesbook-component/lib/QbInput";
import LockIcon from "../../../../Shared/images/lock.svg";
import CalendarIcon from "../../../../Shared/images/calendar.svg";

const styles = {
  root: {
    display: "flex",
    marginTop: 15,
    position: "relative",
    zIndex: 10
  },
  date: {
    flex: 1,
    marginRight: 15
  },
  CVC: {
    flex: 1
  },
  error: {
    marginTop: 8
  },
  erricon: {
    color: "#e07367",
    marginRight: 10
  }
};

export const DatePickerAndCVCInput = props => {
  const errorMsgDate = (
    <div style={styles.error}>
      <span style={styles.erricon}>X</span>Not a valid date
    </div>
  );

  const errorMsg = (
    <div style={styles.error}>
      <span style={styles.erricon}>X</span>Not a valid CVC
    </div>
  );
  return (
    <div style={styles.root}>
      <div style={styles.date}>
        <QbInput
          placeHolder={"MM/YY"}
          size={"large"}
          value={props.singleDate}
          changeHandler={props.dateChangeHandler}
          errorMsg={errorMsgDate}
          isValid={props.isDateValid}
        >
          <img alt="icon" src={CalendarIcon} />
        </QbInput>
      </div>
      <div style={styles.CVC}>
        <QbInput
          placeHolder={"CVC"}
          size={"large"}
          value={props.CVCValue}
          changeHandler={props.CVCChangeHandler}
          errorMsg={errorMsg}
          isValid={props.isCVCValid}
        >
          <img alt="icon" src={LockIcon} />
        </QbInput>
      </div>
    </div>
  );
};
