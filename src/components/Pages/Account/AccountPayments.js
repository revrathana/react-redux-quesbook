import React, { PureComponent } from "react";
import { AccountTemplate } from "./Components/AccountTemplate";
import { PaymentInfo } from "./Components/PaymentInfo";

export const AccountPayments = props => {
  return (
    <AccountTemplate>
      <PaymentInfo />
    </AccountTemplate>
  );
};
