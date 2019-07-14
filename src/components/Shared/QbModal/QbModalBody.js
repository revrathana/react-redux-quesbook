import React from "react";

export const QbModalBody = ({ content }) => {
  const styles = {
    position: "relative",
    flex: "1 1 auto",
    padding: "20px 40px",
    fontSize: "0.9em"
  };
  return <div style={styles}>{content}</div>;
};
