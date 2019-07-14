import React, { PureComponent } from "react";
import { AccountTemplate } from "./Components/AccountTemplate";
import { ChangePassword } from "./Components/ChangePassword";

export const AccountPassword = props => {
  return (
    <AccountTemplate>
      <ChangePassword />
    </AccountTemplate>
  );
};
