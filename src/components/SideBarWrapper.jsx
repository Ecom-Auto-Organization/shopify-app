import React from 'react';
import SideBarContainer from './containers/SideBarContainer';
import { useLocation } from 'react-router-dom';

const SideBarWrapper = () => {
  const location = useLocation();

  const getMainUrlPath = (urlPath) => {
    const mainPath = urlPath.split('/');
    return mainPath[1] ? mainPath[1]: '';
  }
  const mainPath = getMainUrlPath(location.pathname);
  let content = mainPath == 'auth' ? null : (
    <SideBarContainer />
  )

  return content;
};

export default SideBarWrapper; 