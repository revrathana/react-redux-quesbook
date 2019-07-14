import React from "react";
import QbButton from "../../../../Shared/QbButton/QbButton";

const styles = {
  root: {
    marginTop: "20px"
  },
  fontStyle: {
    fontFamily: "Gotham Narrow A, Gotham Narrow B",
    fontSize: "20px",
    fontWeight: "bold"
  },
  buttonStyle: {
    minWidth: "124px",
    width: "100%",
    padding: "0 15px",
    height: "52px",
    borderRadius: "100px",
    boxShadow: "0 2px 20px 0 rgba(25, 34, 48, 0.27)"
  }
};

export const PayButton = props => {
  return (
    <div style={styles.root}>
      <QbButton
        label={`Update`}
        style={styles.buttonStyle}
        className="btn btn-lg btn-primary btn-payment"
        fontStyle={styles.fontStyle}
        disabled={props.disabled}
        clickHandler={props.clickHandler}
      />
    </div>
  );
};
