import React from "react";
import * as routes from "./../../../constants/routes";
import brandIcon from "../../../../img/qb-logo.png";
import brandIcon2x from "../../../../img/qb-logo-2x.png";
import brandIcon3x from "../../../../img/qb-logo-3x.png";

const Brand = props => (
  <a className="navbar-brand" onClick={() => props.push(routes.HOME_PAGE)}>
    <img
      src={brandIcon}
      srcSet={brandIcon2x + " 2x, " + brandIcon3x + " 3x"}
      className="qb-logo"
    />
  </a>
);

export default Brand;
