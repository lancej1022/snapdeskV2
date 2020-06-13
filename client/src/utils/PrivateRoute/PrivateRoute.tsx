import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isLogin } from '../utils';

interface PrivateRouteProps {
  children: any;
  path: string;
  isLoggedIn?: boolean;
}

/**
 *
 * @param children -- represents the component to render if the user IS authenticated
 * @param isLoggedIn -- authentication status
 *
 * Note that the "path" must be specified as '/urlPathHere' similar to a normal Route component
 */

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isLoggedIn,
  path,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
