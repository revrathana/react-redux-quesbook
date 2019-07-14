import React from "react";
import { QbModal } from "./QbModal";
import { QbModalFooter } from "./QbModalFooter";
import { QbModalHeader } from "./QbModalHeader";
import { QbModalBody } from "./QbModalBody";

const QbAssembledModal = ({ close, header, body, footer }) => {
  return (
    <QbModal {...{ close }}>
      {header ? <QbModalHeader content={header} /> : null}
      {body ? <QbModalBody content={body} /> : null}
      {footer ? <QbModalFooter content={footer} /> : null}
    </QbModal>
  );
};

export { QbModal, QbModalFooter, QbModalHeader, QbModalBody, QbAssembledModal };
