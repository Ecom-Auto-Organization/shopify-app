import React from 'react';
import { Table, ConfigProvider, Empty, Tabs } from 'antd'
import { useHistory } from 'react-router-dom';
import PropTypes, { object } from 'prop-types';
import { JobColumns } from '../utils';
import classNames from 'classnames/bind'
import styles from '../styles/main.scss';

const { TabPane } = Tabs;
const cx = classNames.bind(styles)

const propTypes = {
  // A boolean to indicate whether jobs data is loading
  isJobsLoading: PropTypes.bool.isRequired,
  // list of recent jobs
  allJobs: PropTypes.arrayOf(object)
};

const JobsPage = ({
  isJobsLoading,
  allJobs
}) => {
  const history = useHistory();
  const productImportJobs = allJobs.filter(job => job.type === 'IMPORT_CREATE');

  const defaultEmptyDescription = 'No jobs found';
  const productImportEmptyDescription = 'No Product Import Jobs'

  return (
    <div className={cx('jobs-page')}>
      <Tabs>
        <TabPane tab="All Jobs" key="ALL">
          <ConfigProvider
            renderEmpty={
              () => <Empty description={defaultEmptyDescription} image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
            }
          >
            <div className={cx('job-list')}>
              <Table 
                rowKey="id" 
                columns={JobColumns} 
                dataSource={allJobs} 
                loading={isJobsLoading}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      history.push(`/jobs/${record.id}`);
                    }
                  }
                }}
              />
            </div>
          </ConfigProvider>
        </TabPane>
        <TabPane tab="Product Import" key="IMPORT_PRODUCTS">
          <ConfigProvider
            renderEmpty={
              () => <Empty description={productImportEmptyDescription} image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
            }
          >
            <div className={cx('job-list')}>
              <Table 
                rowKey="id" 
                columns={JobColumns} 
                dataSource={productImportJobs} 
                loading={isJobsLoading}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      history.push(`/jobs/${record.id}`);
                    }
                  }
                }}
              />
            </div>
          </ConfigProvider>
        </TabPane>
      </Tabs>
    </div>
  );
};

JobsPage.propTypes = propTypes;
export default JobsPage;
