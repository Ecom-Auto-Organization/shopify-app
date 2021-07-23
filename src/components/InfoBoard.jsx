import React from 'react';
import styles from '../styles/main.scss';
import { Statistic } from 'antd';
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const InfoBoard = (prop) => (
  <div className={cx('info-board')}>
      <Statistic 
        title="Total Jobs"
        value={25}
        className={cx('job-summary-card')}
      />
      <Statistic 
        title="Active Jobs"
        value={1}
        className={cx('job-summary-card')}
      />
  </div>
);

export default InfoBoard;