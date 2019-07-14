import React from "react";
import * as routes from "../../../../constants/routes";

export const AccountNav = props => {
  const { location, push } = props;
  const navList = [
    {
      text: "Profile information",
      variable: "ACCOUNT_PROFILE",
      location: "/account/profile",
    },
    {
      text: "Change password",
      variable: "ACCOUNT_PASSWORD",
      location: "/account/password",
    },
    {
      text: "Payment Info",
      variable: "ACCOUNT_PAYMENTS",
      location: "/account/payments",
    },
  ];

  return (
    <div className="account-nav">
      <ul className="account-nav-list">
        {navList.map(obj => (
          <li
            key={obj.variable}
            className={location === obj.location ? "account-nav-list-bold" : ""}
            onClick={() => push(routes[obj.variable])}
          >
            <a>{obj.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
