import React from "react";
import * as routes from "../../../../constants/routes";

export const TrialExpiredPaymentModal = props => {
  return (
    <div>
      Your trial has expired. Please make a payment from the{" "}
      <a
        style={{ cursor: "pointer" }}
        onClick={() => props.push(routes.ACCOUNT_PAYMENTS)}
      >
        Payment Info
      </a>{" "}
      page.
    </div>
  );
};
