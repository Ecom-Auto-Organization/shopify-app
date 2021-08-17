import React from 'react';
import styles from '../../styles/main.scss'
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

const propTypes = {
  // a boolean to indicate if the modal should be shown
  visible: PropTypes.bool.isRequired
};

const ReloadModal = ({visible}) => {
  const location = useLocation();
  const shop = localStorage.getItem('shop');
  const authUrl = `https://iiz52mz2le.execute-api.us-east-2.amazonaws.com/dev/entry${shop}`;
  const reAuthenticate = () => {
    const timeLength = 1/384;
    Cookies.set('tempPath', `${location.pathname}${location.search}`, { expires: timeLength });
    window.location.assign(authUrl);
  }

  return (
    <Modal
      title='Session Expired'
      visible={visible}
      centered={true}
      closable={false}
      footer={
        <Button type="primary" onClick={reAuthenticate}>
          Reload
        </Button>
      }
    >
      <p>Your session expired. Please press the <b>Reload</b> button to sign in again.</p>
    </Modal>
  )
};

ReloadModal.propTypes = propTypes;
export default ReloadModal; 