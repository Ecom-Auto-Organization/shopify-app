import React from 'react';
import { Table, Tag, Descriptions, Progress, Image } from 'antd'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import ListRenderer from './reusable/ListRenderer';
import defaultImage from '../images/default2.jpg';
import PropTypes, { object } from 'prop-types'
import { useParams } from 'react-router-dom';
import { JobStatus, JobType } from '../utils';
import moment from 'moment';
import classNames from 'classnames/bind';
import styles from '../styles/main.scss';

const cx = classNames.bind(styles);

const propTypes = {
  // A boolean to indicate whether job details is loading
  isLoadingJobDetails: PropTypes.bool.isRequired,
  // an action to get job details from api
  getJobDetails: PropTypes.func.isRequired,
  // the details of the current job in view
  JobDetails: PropTypes.arrayOf(object).isRequired,
  // the shop domain of the user
  shopDomain: PropTypes.string.isRequired
};

const JobDetails = ({
  isLoadingJobDetails,
  jobDetails,
  getJobDetails,
  shopDomain
}) => {
  React.useEffect(() => {
    getJobDetails(params.jobId);
  }, [getJobDetails]);

  const params = useParams();
  React.useEffect(() => {
    const interval = setInterval(() => {
      if ((jobDetails.status === 'SUBMITTED' || jobDetails.status === 'PREPARING' || jobDetails.status === 'RUNNING')) {
        getJobDetails(params.jobId);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [getJobDetails, jobDetails]);

  const getJobMessages = (errors, warnings) => {
    let messages = [];
    if (errors) {
      messages.concat(errors);
    }
    if (warnings) {
      messages.concat(warnings);
    }
    return messages;
  }

  const columns = [
    {
      title: '',
      dataIndex: 'featured_image',
      width: 150,
      render: (text, record) => (
      <a href={'https://' + shopDomain + '/admin/products/' + record.product_id} target="_blank"><Image 
        src={text} 
        height={50} 
        width={50} 
        preview={false}
        fallback={defaultImage}
        alt="Featured Image"
        className={cx('featured-image')}
      /></a>
      )
    },
    {
      title: 'Title',
      dataIndex: 'product_title',
      render: (text, record) => (
        <a href={'https://' + shopDomain + '/admin/products/' + record.product_id} target="_blank">{text}</a>
      )
    },
    {
      title: 'Status',
      key: 'status',
      render: (record) => {
        const status = record.status;
        let statusTag = null;

        switch(status) {
          case 'SUCCESS':
            statusTag = <Tag icon={<CheckCircleOutlined />} color="success">Success</Tag>;
            break;
          case 'FAILED': 
            statusTag = <Tag icon={<CloseCircleOutlined />} color="error">Failed</Tag>;
            break;
        }

        return (statusTag);
      }
    },
    {
      title: 'Job Messages',
      key: 'messages',
      render: (record) => <ListRenderer items={getJobMessages(record?.errors, record?.warnings)} />
    },
  ];

  const formatStartTime = (startTime, status) => {
    if(status === 'SUBMITTED' || status === 'PREPARING') {
      return 'Not Started';
    } else {
      return moment(startTime).format('MMM D, YYYY h:MMa');
    }
  }

  const getProgress = () => {
    if(jobDetails.total_products && jobDetails.total_products > 0) {
      return ((jobDetails.total_success ? jobDetails.total_success : 0) + (jobDetails.total_failed ? jobDetails.total_failed : 0)) / jobDetails.total_products * 100; 
    } else {
      return 0;
    }
  }

  const getSuccess = () => {
    if(jobDetails.total_products && jobDetails.total_products > 0) {
      return (jobDetails.total_success ? jobDetails.total_success : 0) / jobDetails.total_products * 100; 
    } else {
      return 0;
    }
  }

  let resultContent = (jobDetails.results && jobDetails.results.length > 0)? (
    <Table rowKey="id" columns={columns} dataSource={jobDetails?.results} loading={isLoadingJobDetails} />
  ): null;

  return (
    <div className={cx('job-details')}>
      <div className={cx('job-info')}>
        <Descriptions column={2}>
          <Descriptions.Item span={2} >
            <h5>Progress Bar</h5>
            <Progress 
              percent={ getSuccess() } 
              strokeWidth={4} 
            />
          </Descriptions.Item>
          <Descriptions.Item label="Start Time">{formatStartTime(jobDetails.start_time, jobDetails.status)}</Descriptions.Item>
          <Descriptions.Item label="Duration">{jobDetails.duration ? jobDetails.duration : '--'}</Descriptions.Item>
          <Descriptions.Item label="Job Type">{JobType(jobDetails.type)}</Descriptions.Item>
          <Descriptions.Item label="Status">{JobStatus(jobDetails.status)}</Descriptions.Item>
          <Descriptions.Item label="Total Products">{ jobDetails.total_products ? jobDetails.total_products : 0 }</Descriptions.Item>
          <Descriptions.Item label="Success/Failed">{ jobDetails.total_success ? jobDetails.total_success : 0 } / { jobDetails.total_failed ? jobDetails.total_failed : 0 }</Descriptions.Item>
        </Descriptions>
      </div>
      <div className={cx('job-results')}>
        {  resultContent }
      </div>
    </div>
  );
};

JobDetails.proptypes = propTypes;
export default JobDetails;
