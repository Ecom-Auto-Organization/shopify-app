import React from 'react';
import styles from '../styles/main.scss';
import { Layout, Menu } from 'antd';
import { MenuKeyToUrl, UrlToMenuKey } from '../utils';
import ReloadModal from './reusable/ReloadModal';
import PropTypes from 'prop-types';
import { 
  LaptopOutlined, 
  DownloadOutlined, 
  SnippetsOutlined,
  SettingOutlined,
  QuestionCircleFilled
} from '@ant-design/icons';
import { useLocation, useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
const { Sider } = Layout;

const propTypes = {
  // A function to fetch user information
  loadUserData: PropTypes.func.isRequired,
  // A function to fetch user jobs
  loadJobs: PropTypes.func.isRequired,
  // A boolean to indicate whether user access token is expired
  tokenExpired: PropTypes.bool.isRequired,
  // the number of active jobs
  activeJobCount: PropTypes.number.isRequired,
  // function to indicate that product import was successful
  isProductImportSucceeded: PropTypes.bool.isRequired,
  // function to clear product import success flag
  clearProductImportSuccessFlag: PropTypes.func.isRequired,
  // function to refresh user data and job list
  refreshUserData: PropTypes.func.isRequired
};

const SideBar = ({
  loadUserData,
  loadJobs,
  tokenExpired,
  activeJobCount,
  isProductImportSucceeded,
  clearProductImportSuccessFlag,
  refreshUserData
}) => {
  const history = useHistory();
  const location = useLocation();

  const getMainUrlPath = (urlPath) => {
    const mainPath = urlPath.split('/');
    return mainPath[1] ? mainPath[1]: '';
  }

  const mainUrlPath = getMainUrlPath(location.pathname);
  const[selectedKeys, setSelectedKeys] = React.useState([UrlToMenuKey[mainUrlPath]]);
  React.useEffect(() => {
    return history.listen((location) => { 
      const mainUrlPath = getMainUrlPath(location.pathname);
      setSelectedKeys([UrlToMenuKey[mainUrlPath]]);
    }); 
  }, [history])

  React.useEffect(() => {
    loadUserData();
    loadJobs();
  }, [loadUserData, loadJobs]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (activeJobCount && activeJobCount > 0) {
        refreshUserData();
        if(isProductImportSucceeded) {
          clearProductImportSuccessFlag();
        }
      } else if (isProductImportSucceeded) {
        refreshUserData();
      }
    }, 9000);
    return () => clearInterval(interval);
  }, [loadJobs, loadUserData, activeJobCount, isProductImportSucceeded, clearProductImportSuccessFlag]);

  const onMenuSelect = ({ key }) => {
    const menuUrl = MenuKeyToUrl[key];
    history.push(menuUrl);
    setSelectedKeys([UrlToMenuKey[key.toLowerCase()]]);
  }

  return (
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      theme="dark"
      width="245"
      className={cx('custom-sidebar')}
    >
      <div className={cx('logo')} onClick={() => history.push('/dashboard')}>
        Product Upload
      </div>
      <Menu
        mode="inline"
        theme="dark"
        className={cx('custom-menu')}
        selectedKeys={selectedKeys}
        onSelect={onMenuSelect}
        onClick={onMenuSelect}
      >
        <Menu.Item key={UrlToMenuKey.dashboard} icon={<LaptopOutlined />}>Dashboard</Menu.Item>
        <Menu.Item key={UrlToMenuKey.import} icon={<DownloadOutlined />}>Product Import</Menu.Item>
        <Menu.Item key={UrlToMenuKey.jobs} icon={<SnippetsOutlined />}>Job List</Menu.Item>
        {/* <Menu.Item key={UrlToMenuKey.settings} icon={<SettingOutlined />}>Settings</Menu.Item>
        <Menu.Item key={UrlToMenuKey.customer} icon={<QuestionCircleFilled />}>Help Center</Menu.Item> */}
      </Menu>
      <ReloadModal visible={tokenExpired} />
    </Sider>
  )
};

SideBar.propTypes = propTypes;
export default SideBar; 