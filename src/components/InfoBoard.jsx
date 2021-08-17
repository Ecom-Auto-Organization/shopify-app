import React from 'react';
import styles from '../styles/main.scss';
import { Statistic } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

const propTypes = {
  // A boolean to indicate whether user data is loading
  isLoadingUser: PropTypes.bool.isRequired,
  // A boolean to indicate whether jobs data is loading
  jobCount: PropTypes.number.isRequired,
  // the number of active jobs
  activeJobCount: PropTypes.number.isRequired
};


const InfoBoard = ({
  isLoadingUser,
  jobCount,
  activeJobCount
}) => (
  <div className={cx('info-board')}>
      <Statistic 
        title="Total Jobs"
        value={jobCount}
        className={cx('job-summary-card')}
        loading={isLoadingUser}
      />
      <Statistic 
        title="Active Jobs"
        value={activeJobCount}
        className={cx('job-summary-card')}
        loading={isLoadingUser}
      />
  </div>
);

export default InfoBoard;