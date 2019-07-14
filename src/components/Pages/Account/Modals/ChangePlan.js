import React from "react";
import QbButton from "../../../Shared/QbButton/QbButton";
import pricingIcon1 from "../../../Shared/images/pricing-icon-1.png";
import pricingIcon2 from "../../../Shared/images/pricing-icon-2.png";
import pricingIcon3 from "../../../Shared/images/pricing-icon-3.png";

export const ChangePlan = ({
  payments,
  user,
  updatePlan,
  updateState,
  currentPlan,
  newPlan,
  close,
  userFetchPayments
}) => {
  function planCost(plan) {
    if (plan === "1") {
      return "$37.00";
    } else if (plan === "3") {
      return "$54.00";
    } else if (plan === "1Y") {
      return "$99.00";
    } else {
      return "No Plan";
    }
  }
  function planStyle(plan) {
    if (currentPlan === plan) {
      return "planCardContentSky";
    }
    if (newPlan === plan) {
      return "planCardContentDark";
    }
    return "PlanCardSky";
  }
  function formatDate(date) {
    // prettier-ignore
    return `${date.getUTCMonth() < 9 ? "0" + (date.getUTCMonth() + 1) : date.getUTCMonth() + 1}-${date.getUTCDate()}-${date.getUTCFullYear()}`;
  }
  let currentUser = user || {
    free_trial: false,
    created_at: null
  };
  let today = new Date();
  let trialExpiration, daysDifference, planCharge, planExpiration;
  let lastPlan = payments.last_plan;
  trialExpiration = new Date(currentUser.created_at);
  trialExpiration.setDate(trialExpiration.getDate() + 7);
  daysDifference = Math.round(
    (today.getTime() - trialExpiration.getTime()) / 1000 / 60 / 60 / 24
  );
  planCharge = planCost(newPlan);
  return (
    <div className="container-fluid">
      <div className="row trialInfo">
        {currentUser.free_trial && lastPlan && lastPlan.plan == newPlan
          ? `ⓘ Your free trial will expire in ${
              daysDifference < 0 ? "0" : daysDifference
            } days after which you will be charged ${planCharge} dollars`
          : null}
        {!currentUser.free_trial && lastPlan && lastPlan.plan == newPlan
          ? `This is your current plan. It will expire on ${formatDate(
              new Date(lastPlan.expiration_date)
            )}`
          : null}
        {lastPlan && lastPlan.plan !== newPlan
          ? `Your new plan will go into effect ${formatDate(
              new Date(lastPlan.expiration_date)
            )}. You will be charged the new price of ${planCharge} dollars`
          : null}
      </div>
      <div className="row">
        <div className="col-sm-4 text-center">
          <div
            className={`planCard ${
              currentPlan == "1"
                ? "PlanCardSky"
                : newPlan == "1"
                ? "PlanCardDark"
                : "PlanCardSky"
            }`}
          >
            <div className="planCardTitle">
              {`Monthly
                Pass`}
            </div>
            <div
              className={`planCardContent align-items-center ${planStyle("1")}`}
            >
              <div className="planCardImage">
                <img alt="plan_icon_1" src={pricingIcon1} />
              </div>
              <div
                className={`planCardPrice ${
                  currentPlan == "1" || newPlan == "1"
                    ? "planCardPriceDark"
                    : ""
                }`}
              >
                $39
              </div>
              <div className="flex">
                <button
                  className="planCardButton btnSky currentPlanButton"
                  onClick={() => updateState("newPlan", "1")}
                >
                  {newPlan == "1" ? "Current Plan" : "Select"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 text-center">
          <div
            className={`planCard ${
              currentPlan == "3"
                ? "PlanCardSky"
                : newPlan == "3"
                ? "PlanCardDark"
                : "PlanCardSky"
            }`}
          >
            <div className="planCardTitle">
              {`Three-Month
                Pass`}
            </div>
            <div
              className={`planCardContent align-items-center ${planStyle("3")}`}
            >
              <div className="planCardImage">
                <img alt="plan_icon_1" src={pricingIcon2} />
              </div>
              <div
                className={`planCardPrice ${
                  currentPlan == "3" || newPlan == "3"
                    ? "planCardPriceDark"
                    : ""
                }`}
              >
                <del className="planCardPriceGrey">{` $117 `}</del>
                {` $89`}
              </div>
              <div className="flex">
                <button
                  className="planCardButton btnSky currentPlanButton"
                  onClick={() => updateState("newPlan", "3")}
                >
                  {newPlan == "3" ? "Current Plan" : "Select"}
                </button>
              </div>
              <div className="cornerRibbon">{`50% off!`}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 text-center">
          <div
            className={`planCard ${
              currentPlan == "1Y"
                ? "PlanCardSky"
                : newPlan == "1Y"
                ? "PlanCardDark"
                : "PlanCardSky"
            }`}
          >
            <div className="planCardTitle">
              {`One-Year
                Pass`}
            </div>
            <div
              className={`planCardContent align-items-center ${planStyle(
                "1Y"
              )}`}
            >
              <div className="planCardImage">
                <img alt="plan_icon_1" src={pricingIcon3} />
              </div>
              <div
                className={`planCardPrice ${
                  currentPlan == "1Y" || newPlan == "1Y"
                    ? "planCardPriceDark"
                    : ""
                }`}
              >
                $299
              </div>
              <div className="flex">
                <button
                  className="planCardButton btnSky currentPlanButton "
                  onClick={() => updateState("newPlan", "1Y")}
                >
                  {newPlan == "L" || newPlan == "1Y"
                    ? "Current Plan"
                    : "Select"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row planBottomInfo">
        <div className="planBottomInfoTitle">{`All Plans include`}</div>
      </div>
      <div className="row planFeatures">
        <div className="col-sm-6 planFeaturesColumn">
          <ul>
            <li className="planFeature">
              {`A custom study plan targeting your
                  biggest needs`}
            </li>
            <li className=" planFeature">
              {`Detailed explanations of every
                  ACT/SAT skill`}
            </li>
          </ul>
        </div>
        <div className="col-sm-6 planFeaturesColumn">
          <ul>
            <li className="planFeature">
              {`Unlimited access to the world's
                  largest bank of questions`}
            </li>
            <li className="planFeature">
              {`Full-length practice tests to make
                  sure you're ready`}
            </li>
          </ul>
        </div>
      </div>
      <div className="row planDoneButton">
        <QbButton
          label="Update Plan"
          className="btn dark alternate btn-lg"
          style={{
            width: "75%",
            margin: "auto",
            backgroundColor: "#203a62"
          }}
          clickHandler={() => {
            updatePlan(newPlan);
            userFetchPayments();
            close();
          }}
        />
      </div>
    </div>
  );
};
