import React from "react";

import { QbInput } from "quesbook-component/lib/QbInput";
import CreditCardIcon from "../../../../Shared/images/credit-card.svg";
import VisaIcon from "../../../../Shared/images/visa.png";
import AmexIcon from "../../../../Shared/images/amex.png";
import MastercardIcon from "../../../../Shared/images/mastercard.png";
import MaestroIcon from "../../../../Shared/images/maestro.png";
import DinersClubIcon from "../../../../Shared/images/diners-club.png";
import DiscoverIcon from "../../../../Shared/images/discover.png";
import JcbIcon from "../../../../Shared/images/jcb.png";

const styles = {
  root: {
    marginTop: 15
  },
  error: {
    marginTop: 8
  },
  erricon: {
    color: "#e07367",
    marginRight: 10
  }
};

export const CreditCardInput = props => {
  const errorMsg = (
    <div style={styles.error}>
      <span style={styles.erricon}>X</span>Not a valid credit card
    </div>
  );
  const { cardType } = props;
  let cardIconSrc = null;
  switch (cardType) {
    case "Visa":
      cardIconSrc = VisaIcon;
      break;
    case "American Express":
      cardIconSrc = AmexIcon;
      break;
    case "MasterCard":
      cardIconSrc = MastercardIcon;
      break;
    case "Maestro":
      cardIconSrc = MaestroIcon;
      break;
    case "Diner's Club / Carte Blanche":
      cardIconSrc = DinersClubIcon;
      break;
    case "Discover":
      cardIconSrc = DiscoverIcon;
      break;
    case "Japanese Credit Bureau":
      cardIconSrc = JcbIcon;
      break;
    default:
      cardIconSrc = CreditCardIcon;
      break;
  }
  return (
    <div style={styles.root}>
      <QbInput
        placeHolder={"Card number"}
        size={"large"}
        value={props.value}
        changeHandler={props.changeHandler}
        isValid={props.isValid}
        errorMsg={errorMsg}
      >
        <img alt="icon" src={cardIconSrc} />
      </QbInput>
    </div>
  );
};
