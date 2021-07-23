import React from 'react';
import styles from '../styles/main.scss';
import { Layout, Menu } from 'antd';
import { MenuKeyToUrl, UrlToMenuKey } from '../utils';
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

const SideBar = () => {
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
      <div className={cx('logo')}>
        Product Manager
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
        <Menu.Item key={UrlToMenuKey.settings} icon={<SettingOutlined />}>Settings</Menu.Item>
        <Menu.Item key={UrlToMenuKey.customer} icon={<QuestionCircleFilled />}>Help Center</Menu.Item>
      </Menu>
    </Sider>
  )
};

export default SideBar; 