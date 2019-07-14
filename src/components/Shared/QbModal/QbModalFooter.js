import React from "react";

export const QbModalFooter = props => {
  const { style } = this.props;
  return (
    <div className="modal-footer" style={style}>
      {this.props.children}
    </div>
  );
};
