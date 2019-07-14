import React, { PureComponent } from "react";
import { AccountTemplate } from "./Components/AccountTemplate";
import { ProfileInfo } from "./Components/ProfileInfo";

export const AccountProfile = props => {
  return (
    <AccountTemplate>
      <ProfileInfo />
    </AccountTemplate>
  );
};
