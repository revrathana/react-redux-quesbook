import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Router } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { history } from "./../../stores";
import * as routes from "../../constants/routes";
import { userRequest } from "../../actions/userActions";
import PageFactory from "../Pages/PageFactory";
import HomePage from "../Pages/HomePage";
import MathPage from "../Pages/MathPage";
import SkillPage from "../Pages/SkillPage";
import EnglishPage from "../Pages/EnglishPage";
import ReadingPage from "../Pages/ReadingPage";
import SciencePage from "../Pages/SciencePage";
import StudyMaterialPage from "../Pages/StudyMaterialPage";
import {
  AccountProfile,
  AccountPassword,
  AccountPayments,
} from "../Pages/Account";
import PracticeTestEndCardPage from "../Pages/PracticeTestEndCardPage";
import DiagnosticTestEndCardPage from "../Pages/DiagnosticTestEndCardPage";
import "./App.css";

class App extends Component {
  componentWillMount() {
    if (!this.props.user || !this.props.user.user) {
      this.props.userRequest();
    }
  }
  render() {
    const HomePageAugmented = () => (
      <PageFactory user={this.props.user}>
        <HomePage />
      </PageFactory>
    );
    const MathPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <MathPage />
      </PageFactory>
    );
    const SkillPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <SkillPage />
      </PageFactory>
    );
    const EnglishPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <EnglishPage />
      </PageFactory>
    );
    const ReadingPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <ReadingPage />
      </PageFactory>
    );
    const SciencePageAugmented = () => (
      <PageFactory user={this.props.user}>
        <SciencePage />
      </PageFactory>
    );
    const StudyMaterialPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <StudyMaterialPage />
      </PageFactory>
    );
    const AccountProfileAugmented = () => (
      <PageFactory user={this.props.user}>
        <AccountProfile />
      </PageFactory>
    );
    const AccountPasswordAugmented = () => (
      <PageFactory user={this.props.user}>
        <AccountPassword />
      </PageFactory>
    );
    const AccountPaymentsAugmented = () => (
      <PageFactory user={this.props.user}>
        <AccountPayments />
      </PageFactory>
    );
    const PracticeTestEndCardPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <PracticeTestEndCardPage />
      </PageFactory>
    );
    const DiagnosticTestEndCardPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <DiagnosticTestEndCardPage />
      </PageFactory>
    );
    const user = this.props.user ? this.props.user.user : null;
    const status = user ? user.status : null;
    // prettier-ignore
    return (
      <ConnectedRouter history={history}>
        <div className="app">
          { (status === 'lapsed' || status === 'inactive' || status === '7day_expire') && this.props.location !== routes.ACCOUNT_PAYMENTS &&
            this.props.location !== routes.ACCOUNT_PROFILE && this.props.location !== routes.ACCOUNT_PASSWORD ? (
              <Redirect to={routes.ACCOUNT_PAYMENTS} />
          ) : null}
          <Switch>
            <Redirect exact from="/" to={routes.HOME_PAGE} />
            <Route exact path={routes.HOME_PAGE} component={HomePageAugmented} />
          </Switch>
          <Route exact path={routes.MATH_PAGE} component={MathPageAugmented} />
          <Route exact path={routes.SKILL_PAGE} component={SkillPageAugmented} />
          <Route exact path={routes.ENGLISH_PAGE}	component={EnglishPageAugmented} />
          <Route exact path={routes.READING_PAGE}	component={ReadingPageAugmented} />
          <Route exact path={routes.READING_WRITING_PAGE}	component={ReadingPageAugmented} />
          <Route exact path={routes.SCIENCE_PAGE}	component={SciencePageAugmented} />
          <Route exact path={routes.STUDY_MATERIAL_PAGE} component={StudyMaterialPageAugmented} />
          <Route exact path={routes.ACCOUNT_PROFILE} component={AccountProfileAugmented} />
          <Route exact path={routes.ACCOUNT_PASSWORD} component={AccountPasswordAugmented} />
          <Route exact path={routes.ACCOUNT_PAYMENTS} component={AccountPaymentsAugmented} />
          <Route exact path={routes.PRACTICE_TEST_PAGE}	component={PracticeTestEndCardPageAugmented} />
          <Route exact path={routes.DIAGNOSTIC_TEST_PAGE}	component={DiagnosticTestEndCardPageAugmented} />
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  location: state.router.location.pathname,
});

const mapDispatchToProps = dispatch =>
bindActionCreators({ userRequest }, dispatch);

// export default App;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
