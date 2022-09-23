import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import { DialBase } from './DialBase';

export const ScalarDial = ({ value, ...props }) => {
  return (
    <DialBase>{value}</DialBase>
  );
};

ScalarDial.propTypes = {
  value: propTypes.number,
};

ScalarDial.defaultProps = {
  value: 0,
};
