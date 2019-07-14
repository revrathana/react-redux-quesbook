import React from "react";
import Spinner from "../../UI/Common/Spinner";
import Template from "../Template";
import withAuthorization from "../../Session/withAuthorization";
import cookie from 'js-cookie';
import config from 'config';

const PageFactory = props => {
  if (props.user && props.user.user) {
    return <Template>{props.children}</Template>;
  }
  if ( cookie.get('jwt') == null) {
    const time = new Date();
    return window.location.href = config.redirectUrl + '?t=' + time.getTime();
  } else {
    return <Spinner />;
  }
};

export default PageFactory;
