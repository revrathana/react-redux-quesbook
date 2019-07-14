import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  userTestInfoRequest,
  updateUser,
} from "../../../../actions/userActions";
import QbButton from "../../../Shared/QbButton/QbButton";
import { APP_ENV } from "../../../../constants/appConstants";
import "./ProfileInfo.css";

const ProfileField = props => {
  const { field, form, updateProfileInfo } = props;
  return (
    <div className="form-group">
      <label className="profile-field-label">{field.label}</label>
      <input
        className="form-control"
        name={field.name}
        placeholder={field.placeholder}
        onChange={event => updateProfileInfo(field.name, event.target.value)}
        max="32"
        value={form[field.name]}
      />
    </div>
  );
};

const TestInformation = props => {
  const satFields = [
    {
      name: "sat_goal_total_score",
      placeholder: "1 - 1600",
      label: "Goal total score?",
      element: "input",
    },
    {
      name: "sat_goal_math_score",
      placeholder: "1 - 800",
      label: "Goal math score?",
      element: "input",
    },
    {
      name: "sat_goal_readingwriting_score",
      placeholder: "1 - 800",
      label: "Goal reading & writing score?",
      element: "input",
    },
    {
      name: "next_sat_date",
      label: "When do you want to take the test next?",
      element: "select",
    },
  ];
  const actFields = [
    {
      name: "act_goal_total_score",
      placeholder: "1 - 36",
      label: "Goal composite score?",
      element: "input",
    },
    {
      name: "act_goal_english_score",
      placeholder: "1 - 36",
      label: "English goal score?",
      element: "input",
    },
    {
      name: "act_goal_math_score",
      placeholder: "1 - 36",
      label: "Math goal score?",
      element: "input",
    },
    {
      name: "act_goal_reading_score",
      placeholder: "1 - 36",
      label: "Reading goal score?",
      element: "input",
    },
    {
      name: "act_goal_science_score",
      placeholder: "1 - 36",
      label: "Science goal score?",
      element: "input",
    },
    {
      name: "next_act_date",
      label: "When do you want to take the test next?",
      element: "select",
    },
  ];
  const { type, user, updateTestInfo } = props;
  const testFields = type === "SAT" ? satFields : actFields;
  const testDates = type === "SAT" ? APP_ENV.nextDateSAT : APP_ENV.nextDateACT;
  const testMax = type === "SAT" ? "1800" : "36";
  const testMin = "1";
  return (
    <div className="info-test-content box-flex">
      {testFields.map(field => (
        <div key={field.name} className="profile-field">
          <span className="profile-field-label">{field.label}</span>
          {field.element === "input" ? (
            <input
              className="form-control"
              type="number"
              min={testMin}
              max={testMax}
              placeholder={field.placeholder}
              value={props.test_goals[field.name] || ""}
              onChange={event =>
                updateTestInfo(field.name, parseInt(event.target.value, 10))
              }
            />
          ) : (
            <select
              value={props.test_goals[field.name] || ""}
              onChange={event => updateTestInfo(field.name, event.target.value)}
            >
              {testDates.map(date => (
                <option key={date.label} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
};

class ProfileInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSAT: false,
      showACT: false,
      form: {},
    };
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.updateProfileInfo = this.updateProfileInfo.bind(this);
    this.updateTestInfo = this.updateTestInfo.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  componentDidMount() {
    if (!this.props.user.profile) {
      this.props.userTestInfoRequest();
    } else {
      const form = this.convertPropsToState(this.props);
      this.setState(form);
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.user.profile && this.props.user.profile) {
      const form = this.convertPropsToState(this.props);
      this.setState(form);
    }
  }
  convertPropsToState(props) {
    return {
      showSAT: props.user.profile.has_taken_sat,
      showACT: props.user.profile.has_taken_act,
      form: {
        first_name: props.user.first_name,
        last_name: props.user.last_name,
        nick_name: props.user.nick_name,
        school_name: props.user.school_name,
        mobile_phone: props.user.mobile_phone,
        avatarFileName: "",
        profile_attributes: {
          has_taken_act: props.user.profile.has_taken_act,
          has_taken_sat: props.user.profile.has_taken_sat,
          test_goals: {
            sat_goal_total_score:
              props.user.profile.test_goals.sat_goal_total_score,
            sat_goal_math_score:
              props.user.profile.test_goals.sat_goal_math_score,
            sat_goal_readingwriting_score:
              props.user.profile.test_goals.sat_goal_readingwriting_score,
            next_sat_date: props.user.profile.test_goals.next_sat_date,
            act_goal_total_score:
              props.user.profile.test_goals.act_goal_total_score,
            act_goal_english_score:
              props.user.profile.test_goals.act_goal_english_score,
            act_goal_math_score:
              props.user.profile.test_goals.act_goal_math_score,
            act_goal_reading_score:
              props.user.profile.test_goals.act_goal_reading_score,
            act_goal_science_score:
              props.user.profile.test_goals.act_goal_science_score,
            next_act_date: props.user.profile.test_goals.next_act_date,
          },
        },
      },
    };
  }
  toggleCheckbox(name) {
    this.setState(prevState => {
      return { [name]: !prevState[name] };
    });
  }
  submitForm() {
    const dupeForm = { ...this.state.form };
    dupeForm.mobile_phone = dupeForm.mobile_phone.match(/\d/g).join("");
    this.props.updateUser(dupeForm);
  }
  updateProfileInfo(key, value) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [key]: value,
      },
    });
  }
  updateTestInfo(key, value) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        profile: {
          ...this.state.form.profile,
          test_goals: {
            ...this.state.form.profile.test_goals,
            [key]: value,
          },
        },
      },
    });
  }
  render() {
    const styles = {
      uploadAvatarButton: {
        fontWeight: "bold",
        fontSize: "16px",
        width: "60%",
        marginBottom: "15px",
      },
      uploadAvatar: {
        width: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        flex: "1 1 0%",
        fontFamily: '"Gotham Narrow A", "Gotham Narrow B"',
      },
    };
    const profileFields = [
      {
        name: "first_name",
        placeholder: "James",
        label: "First name",
      },
      {
        name: "last_name",
        placeholder: "Bond",
        label: "Last name",
      },
      {
        name: "nick_name",
        placeholder: "",
        label: "What do you go by?",
      },
      {
        name: "mobile_phone",
        placeholder: "646-690-6020",
        label: "Cell Phone",
      },
      {
        name: "school_name",
        placeholder: "School name",
        label: "Which school do you go to?",
      },
    ];
    const { showACT, showSAT, form } = this.state;
    const { user } = this.props;
    const {
      toggleCheckbox,
      submitForm,
      updateProfileInfo,
      updateTestInfo,
    } = this;
    return (
      <div>
        <h5 className="account-section-h5">Profile Information</h5>
        {true ? null : (
          <div className="profile-group">
            <h5 className="account-section-h5">Avatar</h5>}
            <div className="avatar-content">
              <img className="avatar-image" />
              <div className="avatar-options">
                <button
                  className="section-avatar-right-btn btn btn-secondary click"
                  type="button"
                  style={styles.uploadAvatarButton}
                >
                  <div style={styles.uploadAvatar}>Upload new photo</div>
                </button>
                <div className="avatar-options-text">
                  <span>Portrait, not landscape</span>
                  <span>White background</span>
                  <span>
                    No less than 2MB (a smartphone picture works just fine!)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {form.profile_attributes ? (
          <form onSubmit={event => formHandler(event)}>
            <div className="profile-group">
              <h5 className="account-section-h5">Personal Information</h5>
              {profileFields.map(field => (
                <ProfileField
                  key={field.name}
                  {...{ field, form, updateProfileInfo }}
                />
              ))}
            </div>
            <div className="profile-group">
              <h5 className="account-section-h5">Test Information</h5>
              <div className="test-information">
                <label>
                  <input
                    type="checkbox"
                    checked={showSAT}
                    onChange={() => toggleCheckbox("showSAT")}
                  />
                  SAT
                </label>
                {showSAT ? (
                  <TestInformation
                    type="SAT"
                    {...{
                      ...form.profile_attributes,
                      updateTestInfo,
                    }}
                  />
                ) : null}
                <label>
                  <input
                    type="checkbox"
                    checked={showACT}
                    onChange={() => toggleCheckbox("showACT")}
                  />
                  ACT
                </label>
                {showACT ? (
                  <TestInformation
                    type="ACT"
                    {...{
                      ...form.profile_attributes,
                      updateTestInfo,
                    }}
                  />
                ) : null}
              </div>
            </div>
            <QbButton
              key="cancel-button"
              label="Save changes"
              className="btn dark alternate btn-lg"
              style={{
                width: "60%",
                margin: "50px auto 0px auto",
                backgroundColor: "#203a62",
              }}
              clickHandler={() => {
                submitForm();
              }}
            />
          </form>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user.user,
  profile: state.userReducer.user.user.profile,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ userTestInfoRequest, updateUser }, dispatch);

export const ProfileInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileInfoComponent);
