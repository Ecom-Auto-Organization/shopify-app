import React from 'react';
import styles from '../styles/main.scss';
import InfoBoard from './InfoBoard'
import { Table, Tag, ConfigProvider, Empty } from 'antd'
import { Link, useHistory } from 'react-router-dom';
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Dashboard = () => {
  const history = useHistory();
  const jobList = [
    {
      startTime: 'March 2, 2021 5:00am',
      type: 'Product Import',
      status: 'RUNNING',
      totalProducts: 20,
      successful: 8,
      jobId: '1',
    },
    {
      startTime: 'March 2, 2021 5:00am',
      type: 'Product Import',
      status: 'SUBMITTED',
      totalProducts: 20,
      successful: 0,
      jobId: '6',
    },
    {
      startTime: 'March 2, 2021 5:00am',
      type: 'Product Import',
      status: 'COMPLETED',
      totalProducts: 15,
      successful: 4,
      jobId: '2',
    },
    {
      startTime: 'March 8, 2021 5:00am',
      type: 'Product Import',
      status: 'PREPARING',
      totalProducts: 15,
      successful: 0,
      jobId: '5',
    },
    {
      startTime: 'March 6, 2021 5:00am',
      type: 'Product Import',
      status: 'PARTIALLY COMPLETED',
      totalProducts: 7,
      successful: 7,
      jobId: '3',
    },
    {
      startTime: 'March 6, 2021 5:00am',
      type: 'Product Import',
      status: 'FAILED',
      totalProducts: 7,
      successful: 0,
      jobId: '8',
    }
  ];

  const columns = [
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'Job Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      // dataIndex: 'status',
      key: 'status',
      render: (record) => {
        const status = record.status;
        let statusTag = null;

        switch(status) {
          case 'SUBMITTED':
            statusTag = <Tag icon={<ClockCircleOutlined />} color="default">Submitted</Tag>;
            break;
          case 'PREPARING':
            statusTag = <Tag icon={<SyncOutlined spin/>} color="cyan">Preparing</Tag>;
            break;
          case 'RUNNING':
            statusTag = <Tag icon={<SyncOutlined spin/>} color="processing">Running</Tag>;
            break;
          case 'COMPLETED':
            statusTag = <Tag icon={<CheckCircleOutlined />} color="success">Completed</Tag>;
            break;
          case 'PARTIALLY COMPLETED': 
            statusTag = <Tag icon={<ExclamationCircleOutlined />} color="warning">Partial Complete</Tag>;
            break;
          case 'FAILED': 
            statusTag = <Tag icon={<CloseCircleOutlined />} color="error">Failed</Tag>;
            break;
        }

        return (statusTag);
      }
    },
    {
      title: 'Total Products/Succeeded',
      key: 'totalProducts',
      render: (record) => (
        <>{record.successful} / {record.totalProducts}</>
      )
    }
  ];

  return (
    <div className={cx('dashboard')}>
      <InfoBoard/>
      <div>
        <h3>Job List</h3>
        <ConfigProvider
          renderEmpty={
            () => <Empty description="No Jobs Created" image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
          }
        >
          <Table 
            rowKey="jobId" 
            columns={columns} 
            dataSource={jobList} 
            pagination={false} 
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  history.push(`/jobs/${record.jobId}`);
                }
              }
            }}
          />
        </ConfigProvider>
        {jobList.length > 0 && <div className={cx('dashboard-job-footnote')}><Link to="/jobs">view All Jobs</Link></div>}
      </div>
    </div>
  );
};

export default Dashboard;
