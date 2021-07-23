import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from '../../styles/main.scss';

const propTypes = {
  // title of the input.
  title: PropTypes.string.isRequired,
  // subtitle of the input. 
  subTitle: PropTypes.string,
}

const defaultProps = {
  subTitle: ''
};

const cx = classNames.bind(styles)

const InputTitle = ({title, subTitle}) => (
  <>
    <div className={cx('input-title')}>
      <div>{title}</div>
      {subTitle != '' && <div>{subTitle}</div>}
    </div>
  </>
);

InputTitle.propTypes = propTypes;
InputTitle.defaultProps = defaultProps;
export default InputTitle;