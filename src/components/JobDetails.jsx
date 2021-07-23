import React from 'react';
import { Table, Tag, Descriptions, Progress, Image } from 'antd'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import ListRenderer from './reusable/ListRenderer';
import defaultImage from '../images/default2.jpg';
import classNames from 'classnames/bind';
import styles from '../styles/main.scss';

const cx = classNames.bind(styles)

const Dashboard = (prop) => {

  const jobDetail = {
    startTime: 'March 2, 2021 5:00am',
    type: 'Product Import',
    status: 'COMPLETED',
    totalProducts: 20,
    processed: 20,
    successful: 18,
    duration: '5 seconds',
    jobId: '1',
  };

  const jobResults = [
    {
      resultId: 1,
      title: 'New shoe',
      createdAt: 'March 2, 2021 11:05 AM',
      status: 'SUCCESS',
      productId: '12348485',
      featuredImage: '',
      messages: [
        'collection was invalid and did not create.',
        'Invalid Collection',
        'something was wrong with status'
      ],
    },
    {
      resultId: 2,
      title: 'New shirt',
      createdAt: 'March 2, 2021 11:05 AM',
      status: 'SUCCESS',
      productId: '12348485',
      featuredImage: 'https://cdn.shopify.com/s/files/1/0557/4433/1961/products/product-image-1429647494.jpg?v=1621635850',
      messages: [
        'collection was invalid and did not create. but there are so many things that can go wrong so we are waiting'
      ],
    },
    {
      resultId: 3,
      title: 'New pants',
      createdAt: 'March 2, 2021 11:05 AM',
      status: 'FAILED',
      productId: '12348485',
      featuredImage: '',
      messages: [
        'product could not create.', 
        'collection was invalid and did not create.'
      ],
    }
  ]

  const columns = [
    {
      title: '',
      dataIndex: 'featuredImage',
      key: 'featuredImage',
      width: 150,
      render: text => (
      <Image 
        src={text} 
        height={50} 
        width={50} 
        preview={false}
        fallback={defaultImage}
        alt="Featured Image"
        className={cx('featured-image')}
      />
      )
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
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
      render: (record) => <ListRenderer items={record.messages} />
    },
  ];

  let resultContent = jobResults ? (
    <Table rowKey="resultId" columns={columns} dataSource={jobResults} />
  ): null;

  return (
    <div className={cx('job-details')}>
      <div className={cx('job-info')}>
        <Descriptions column={2}>
          <Descriptions.Item span={2} >
            <h5>Progress Bar</h5>
            <Progress 
              percent={jobDetail.processed / jobDetail.totalProducts * 100} 
              strokeWidth={4} 
            />
          </Descriptions.Item>
          <Descriptions.Item label="Start Time">{jobDetail.startTime}</Descriptions.Item>
          <Descriptions.Item label="Duration">{(jobDetail.duration && jobDetail?.duration.trim() !== '') ? jobDetail.duration : '--'}</Descriptions.Item>
          <Descriptions.Item label="Job Type">{jobDetail.type}</Descriptions.Item>
          <Descriptions.Item label="Status">{<Tag icon={<CheckCircleOutlined />} color="success">Completed</Tag>}</Descriptions.Item>
          <Descriptions.Item label="Total Products">{jobDetail.totalProducts}</Descriptions.Item>
          <Descriptions.Item label="Successful">{jobDetail.successful}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className={cx('job-results')}>
        {resultContent}
      </div>
    </div>
  );
};

export default Dashboard;
