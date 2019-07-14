import React from "react";
import { QbAssembledModal } from "../../../Shared/QbModal";

export const CancellationPolicyModal = ({ close, type }) => {
  const bodyContent = `You can cancel your Quesbook membership at any time, and you will
  continue to have access to the service through the end of your billing
  period. We do not provide refunds or credits for any partial-month
  membership periods. To cancel, go to the "Settings" page on our website
  and follow the instructions for cancellation. If you cancel your
  membership, your account will automatically close at the end of your
  current billing period. To see when your account will close, click
  "Plans" section on the "Settings" page.`;
  return (
    <QbAssembledModal
      {...{ close, type }}
      header="Cancellation Policy"
      body={bodyContent}
    />
  );
};
