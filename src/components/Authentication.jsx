import React from 'react';
import Proptypes from 'prop-types';
import { Result, Button } from 'antd';
import Cookies from 'js-cookie';
import { useParams, useLocation, Redirect } from 'react-router-dom';

const proptypes = {
  // A function to authenticate users
  authenticateUser: Proptypes.func.isRequired,
  // Indicates whether app is in the process of authenticating
  isAuthenticating: Proptypes.bool.isRequired,
  // Indicates whether authentication failed
  isAuthenticationFailed: Proptypes.bool.isRequired,
  // Indicates whether authentication succeeded
  isAuthenticationSucceeded: Proptypes.bool.isRequired,
  // Indicates whether user details is loaded,
  isUserLoaded: Proptypes.bool.isRequired
}

const Authentication = ({
  authenticateUser,
  isAuthenticating,
  isAuthenticationFailed,
  isAuthenticationSucceeded,
}) => {
  const search = useLocation().search
  const params = useParams();
  const authUrl = `https://iiz52mz2le.execute-api.us-east-2.amazonaws.com/dev/entry${search}`;

  const accessToken = Cookies.get('tkn');
  const authenticated = (accessToken != null && accessToken != undefined);
  if (isAuthenticationSucceeded || authenticated) {
    localStorage.setItem('shop', search);
    const path = (Cookies.get('tempPath') != undefined) ? Cookies.get('tempPath') : '/dashboard';
    return (<Redirect to={path} />);
  }

  React.useEffect(() => {
    authenticateUser(params.userId);
  }, [authenticateUser])

  const reAuthenticate = () => {
    window.location.assign(authUrl);
  }

  let content = null;
  if (isAuthenticating) {
    content = (<h2>Loading...</h2>)
  } else if (isAuthenticationFailed) {
    content = (
      <Result 
        status="403"
        title="Unable to Authenticate :("
        subTitle="An Error occured whiles authenticating. Please try again."
        extra={<Button type="primary" onClick={reAuthenticate}>Retry</Button>}
      />
    )
  }

  return (
    <>
      {content}
    </>
  )
};

export default Authentication; 