import React from 'react';
import styles from '../styles/main.scss';
import PageTitle from './reusable/PageTitle';
import DashboardContainer from './containers/DashboardContainer';
import JobsPageContainer from './containers/JobsPageContainer';
import ProductImportPageContainer from './containers/ProductImportPageContainer';
import JobDetailsContainer from './containers/JobDetailsContainer';
import AuthenticateContainer from './containers/AuthenticateContainer';
import PropTypes from 'prop-types';
import { Result, Button, Alert } from 'antd';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import { clearLoadJobDetailsFailedFlag } from '../actions';

const cx = classNames.bind(styles)

const propTypes = {
  // A boolean to indicate if an error occured whiles retrieving user data
  isLoadUserFailed: PropTypes.bool.isRequired,
  // A boolean to indicate if an error occured whiles retrieving jobs list
  isLoadJobsFailed: PropTypes.bool.isRequired,
  // function to clear failed jobs flags
  clearLoadJobsFailedFlag: PropTypes.func.isRequired,
  // function to clear failed user flags
  clearLoadUserFailedFlag: PropTypes.func.isRequired,
  // function to clear failed job details flag
  clearLoadJobDetailsFailedFlag: PropTypes.func.isRequired,
  // a boolean indicating weather job details api failed
  isJobDetailsFailed: PropTypes.bool.isRequired
};

const ContentWrapper = ({
  isLoadJobsFailed,
  isLoadUserFailed,
  clearLoadJobsFailedFlag,
  clearLoadUserFailedFlag,
  isJobDetailsFailed,
  clearLoadJobDetailsFailedFlag
}) => {
  const history = useHistory();

  const goHome = () => {
    history.push('/dashboard');
  }


  return (
    <div className={cx('content-wrapper')}>
      <Switch>
        <Route exact path="/jobs/:id">
          <PageTitle title="Job Details" back={true}/>
        </Route>
        <Route exact path="/jobs">
          <PageTitle title="Job List" />
        </Route>
        <Route exact path="/import">
          <PageTitle title="Product Import" />
        </Route>
        <Route exact path={["/dashboard", "/"]}>
          <PageTitle title="Dashboard" />
        </Route>
      </Switch>
      {
        isLoadUserFailed && 
        <Alert 
          message="We are having an issue retrieving your information. Please try reloading the page."
          closable={true}
          showIcon={true}
          type="error"
          onClose={clearLoadUserFailedFlag}
        />
      }
      {
        isLoadJobsFailed && 
        <Alert 
          message="We are having an issue retrieving your created jobs. Please try reloading the page."
          closable={true}
          showIcon={true}
          type="error"
          onClose={clearLoadJobsFailedFlag}
        />
      }
      {
        isJobDetailsFailed && 
        <Alert 
          message="We are having an issue retrieving the job details."
          closable={true}
          showIcon={true}
          type="error"
          onClose={clearLoadJobDetailsFailedFlag}
        />
      }
      <Switch>
        <Route exact path="/jobs/:jobId">
          <JobDetailsContainer />
        </Route>
        <Route exact path="/jobs">
          <JobsPageContainer />
        </Route>
        <Route exact path="/import">
          <ProductImportPageContainer />
        </Route>
        <Route exact path="/dashboard">
          <DashboardContainer />
        </Route>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route exact path="/auth/:userId">
          <AuthenticateContainer />
        </Route>
        <Route path="*">
          <Result 
            status="404"
            title="404 :("
            subTitle="Sorry, we couldn't find the page you are looking for"
            extra={<Button type="primary" onClick={goHome} >Back Home</Button>}
          />
        </Route>
      </Switch>
    </div>
  )
  };

export default ContentWrapper;