import React from "react";

import { QbInput } from "quesbook-component/lib/QbInput";
import CreditCardIcon from "../../../../Shared/images/credit-card.svg";

const styles = {
  root: {
    marginTop: 40
  },
  error: {
    marginTop: 8
  },
  erricon: {
    color: "#e07367",
    marginRight: 10
  }
};

export const CardHolderInput = props => {
  const errorMsg = (
    <div style={styles.error}>
      <span style={styles.erricon}>X</span>Not a valid card holder
    </div>
  );
  return (
    <div style={styles.root}>
      <QbInput
        placeHolder={"Card holder"}
        size={"large"}
        value={props.value}
        changeHandler={props.changeHandler}
        isValid={props.isValid}
        errorMsg={errorMsg}
      >
        <img alt="icon" src={CreditCardIcon} />
      </QbInput>
    </div>
  );
};
