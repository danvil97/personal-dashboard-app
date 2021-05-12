/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLogged } from '../features/userSlice';

const PrivateRoute = ({ children, ...restProps }) => {
  const isLogged = useSelector(selectIsLogged);

  return <Route {...restProps} render={() => (isLogged ? children : null)} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

PrivateRoute.defaultProps = {
  children: null,
};

export default PrivateRoute;
