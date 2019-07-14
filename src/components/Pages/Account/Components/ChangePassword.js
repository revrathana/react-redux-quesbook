import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userUpdatePassword } from "../../../../actions/userActions";

const PasswordField = props => {
  return (
    <div className="form-group">
      <label className="password-field-label">{props.label}</label>
      <input
        type="password"
        className="form-control"
        placeholder={props.placeholder}
        onChange={event => props.change(props.name, event.target.value)}
      />
    </div>
  );
};

class ChangePasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_password: "",
      password: "",
      password_confirmation: "",
      warning: "",
    };
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  validateForm() {
    const { current_password, password, password_confirmation } = this.state;
    if (
      !current_password.length ||
      !password.length ||
      !password_confirmation.length
    ) {
      this.setState({ warning: "Please fill in all password fields" });
      return;
    }
    if (password.length < 6) {
      this.setState({ warning: "Your password needs at least 6 characters" });
      return;
    }
    if (password !== password_confirmation) {
      this.setState({
        warning:
          "Your new password and your confirmation password should be the same",
      });
      return;
    }
    this.setState({ warning: "" });
    this.props.userUpdatePassword({
      current_password: current_password,
      password: password,
      password_confirmation: password_confirmation,
    });
  }
  handleChange(key, value) {
    this.setState({ [key]: value });
  }
  render() {
    const fields = [
      {
        name: "current_password",
        placeholder: "Current Password",
        label: "Enter current password",
      },
      {
        name: "password",
        placeholder: "New Password",
        label: "Enter new password",
      },
      {
        name: "password_confirmation",
        placeholder: "New Password",
        label: "Re-enter new password",
      },
    ];
    const style = {
      buttonDiv: {
        backgroundColor: "rgb(32, 58, 98)",
        padding: "8px 26px 9px",
        fontSize: "14px",
        color: "rgb(255, 255, 255)",
        fontWeight: "700",
      },
    };
    const { validateForm, handleChange } = this;
    const { warning } = this.state;
    const { update_password } = this.props;
   
    console.log('update_password', update_password)
    return (
      <div>
        <h5 className="account-section-h5">Change Password</h5>
        {fields.map(field => (
          <PasswordField key={field.name} change={handleChange} {...field} />
        ))}
        <div className="form-group">
          {warning !== "" ? <p style={{ color: "red" }}>{warning}</p> : null}
        </div>
        <div className="form-group">
          <button
            className="dark alternate btn-lg"
            style={style.buttonDiv}
            onClick={validateForm}
          >
            <div className="change-password-button">Change password</div>
          </button>
        </div>
        {typeof update_password !== "undefined"?
         ( update_password.state == true?
          (<div className="banner_wrapper">
            <p>
              Password is updated
            </p>
          </div>): 
          (<div className="banner_wrapper">
            <p>
              {update_password.error}
            </p>
          </div>) )
          : null
          }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    update_password: state.userReducer.update_password,
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ userUpdatePassword }, dispatch);

export const ChangePassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordComponent);
