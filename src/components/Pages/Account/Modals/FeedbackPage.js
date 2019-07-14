import React from "react";
import { QbAssembledModal } from "../../../Shared/QbModal";
import QbButton from "../../../Shared/QbButton/QbButton";

export const FeedbackPage = props => {
  const {
    close,
    type,
    updateState,
    payments,
    cancelPlan,
    submitFeedback,
    userFetchPayments
  } = props;
  const planDate = new Date(payments.last_plan.expiration_date);
  // prettier-ignore
  const formattedDate = `${planDate.getUTCMonth() < 9 ? "0" + (planDate.getUTCMonth() + 1) : planDate.getUTCMonth() + 1}-${planDate.getUTCDate()}-${planDate.getUTCFullYear()}`;
  const styles = {
    cancellationReason: {
      marginTop: "15px",
      width: "100%"
    }
  };
  return (
    <QbAssembledModal
      {...{ close, type }}
      header="We are sorry to see you go"
      body={
        <div>
          <p>{`If you cancel, your current plan will stay active until ${formattedDate}. You can restart your membership at any time, and all of your tests and
          profile data will be remembered for one year. We would appreciate it if you could tell us the reason for your cancellation using the field below.`}</p>
          <label style={styles.cancellationReason}>
            <span>Cancellation Reason: </span>
            <select
              onChange={event =>
                updateState("cancellationReason", event.target.value)
              }
              value={props.cancellationReason}
            >
              <option value="" />
              <option value="Did not need it">Did not need it</option>
              <option value="Was too expensive">Was too expensive</option>
              <option value="Was not helpful">Was not helpful</option>
              <option value="Done studying">Done studying</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label
            style={
              props.cancellationReason === "Other"
                ? styles.cancellationReason
                : { display: "none" }
            }
          >
            <span>Description: </span>
            <textarea
              rows="4"
              cols="60"
              value={props.otherDescriptionValue}
              onChange={event =>
                updateState("otherDescriptionValue", event.target.value)
              }
            />
          </label>
          <QbButton
            label="Cancel Plan"
            className="btn dark alternate btn-lg"
            style={{
              width: "75%",
              margin: "50px auto 0px auto",
              backgroundColor: "#203a62"
            }}
            clickHandler={() => {
              cancelPlan(props.user.id);
              submitFeedback({
                id: props.user.id,
                description:
                  props.cancellationReason === "Other"
                    ? props.cancellationReason +
                      ": " +
                      props.otherDescriptionValue
                    : props.cancellationReason
              });
              userFetchPayments();
              close();
            }}
          />
        </div>
      }
    />
  );
};
