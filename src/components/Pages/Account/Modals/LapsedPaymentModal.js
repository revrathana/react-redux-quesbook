import React from "react";
import * as routes from "../../../../constants/routes";

export const LapsedPaymentModal = props => {
  return (
    <div>
      Your payment has lapsed. Please make another payment from the{" "}
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
