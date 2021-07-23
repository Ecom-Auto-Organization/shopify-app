import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { PageHeader } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from '../../styles/main.scss';

const propTypes = {
  // title of the page.
  title: PropTypes.string.isRequired,
  // whether the title navigates back
  back: PropTypes.bool,
}

const defaultProps = {
  back: false,
};

const cx = classNames.bind(styles)

const PageTitle = ({title, back}) => (
  <div className={cx('page-title')}>
    {
      back ? <PageHeader title={title} onBack={() => window.history.back()} /> : <h1>{title}</h1>
    }
  </div>
);

PageTitle.propTypes = propTypes;
PageTitle.defaultProps = defaultProps;
export default PageTitle;
