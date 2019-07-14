import React from "react";

export const QbModalHeader = ({ content }) => {
  const styles = {
    container: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      padding: "15px",
      borderBottom: "1px solid #e9ecef",
      borderTopLeftRadius: "0.3rem",
      borderTopRightRadius: "0.3rem"
    },
    content: {
      fontWeight: "bold",
      fontSize: 24,
      fontFamily: "Gotham Narrow A, Gotham Narrow B"
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.content}>{content}</div>
    </div>
  );
};
