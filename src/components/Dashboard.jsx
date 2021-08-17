import React from 'react';
import styles from '../styles/main.scss';
import InfoBoard from './InfoBoard';
import PropTypes, { object } from 'prop-types';
import { Table, ConfigProvider, Empty, Button } from 'antd'
import { Link, useHistory } from 'react-router-dom';
import { JobColumns } from '../utils';
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

const propTypes = {
  // A boolean to indicate whether user data is loading
  isLoadingUser: PropTypes.bool.isRequired,
  // A boolean to indicate whether jobs data is loading
  isJobsLoading: PropTypes.bool.isRequired,
  // the number of total jobs
  jobCount: PropTypes.number.isRequired,
  // the number of active jobs
  activeJobCount: PropTypes.number.isRequired,
  // list of recent jobs
  recentJobs: PropTypes.arrayOf(object)
};

const Dashboard = ({
  isLoadingUser,
  isJobsLoading,
  jobCount,
  activeJobCount,
  recentJobs
}) => {
  const history = useHistory();

  return (
    <div className={cx('dashboard')}>
      <InfoBoard activeJobCount={activeJobCount} jobCount={jobCount} isLoadingUser={isLoadingUser} />
      <div>
        <h3>Recent Jobs</h3>
        <ConfigProvider
          renderEmpty={
            () => 
              <>
                <Empty description="No jobs found" image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                <Button onClick={() => history.push('/import')} >Create Job</Button> 
              </>
          }
        >
          <Table 
            rowKey="id" 
            columns={JobColumns} 
            dataSource={recentJobs} 
            pagination={false} 
            loading={isJobsLoading}
            onRow={(record) => {
              return {
                onClick: () => {
                  history.push(`/jobs/${record.id}`);
                }
              }
            }}
          />
        </ConfigProvider>
        {recentJobs.length > 0 && <div className={cx('dashboard-job-footnote')}><Link to="/jobs">view All Jobs</Link></div>}
      </div>
    </div>
  );
};

Dashboard.propTypes = propTypes;
export default Dashboard;
