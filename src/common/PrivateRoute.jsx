/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLogged } from '../features/userSlice';

const PrivateRoute = ({ children, ...restProps }) => {
  const isLogged = useSelector(selectIsLogged);

  return (
    <Route
      {...restProps}
      render={({ location }) =>
        isLogged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

PrivateRoute.defaultProps = {
  children: null,
};

export default PrivateRoute;
