import React from 'react';
import styles from '../styles/main.scss';
import PageTitle from './reusable/PageTitle';
import Dashboard from './Dashboard';
import JobsPage from './JobsPage';
import ProductImportPage from './ProductImportPage'
import JobDetails from './JobDetails'
import { Result, Button } from 'antd';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

const ContentWrapper = () => {
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
      <Switch>
        <Route exact path="/jobs/:id">
          <JobDetails />
        </Route>
        <Route exact path="/jobs">
          <JobsPage />
        </Route>
        <Route exact path="/import">
          <ProductImportPage />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route exact path="/auth/:userId">
          <div>Loading</div>
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