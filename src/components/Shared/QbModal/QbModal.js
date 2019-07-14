import React, { Component } from "react";
import CloseIcon from "../images/x-icon@3x.png";

export const QbModal = props => {
  let modalOverlay = React.createRef();
  const styles = {
    modal: {
      position: "fixed",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      zIndex: "1050",
      overflowX: "hidden",
      overflowY: "auto",
      outline: "0",
      backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    modalDialog: {
      position: "relative",
      width: "auto",
      maxWidth: "650px",
      margin: "25px auto",
      pointerEvents: "none",
      borderRadius: "10px",
      zIndex: "1051"
    },
    modalContent: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      pointerEvents: "auto",
      backgroundColor: "#fff",
      backgroundClip: "padding-box",
      border: "1px solid rgba(0, 0, 0, 0.2)",
      borderRadius: "0.3rem",
      outline: "0"
    },
    closeBtn: {
      position: "absolute",
      right: 15,
      top: 20,
      height: 15,
      width: 15
    }
  };
  const { close, type } = props;
  function handleClick(e) {
    if (modalOverlay.contains(e.target)) {
      return;
    }
    close(type);
  }
  return (
    <div style={styles.modal} onClick={handleClick}>
      <div ref={ref => (modalOverlay = ref)} style={styles.modalDialog}>
        <div style={styles.modalContent}>
          <img
            alt="closeBtn"
            src={CloseIcon}
            onClick={() => close(type)}
            style={styles.closeBtn}
          />
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default QbModal;
