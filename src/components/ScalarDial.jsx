import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const Dial = styled.span`
  border: 2px solid #fff;
  border-radius: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-size: 60px;

  width: 95px;
  height: 95px;
`;

export const ScalarDial = ({ value, ...props }) => {
  return (
    <Dial>{value}</Dial>
  );
};

ScalarDial.propTypes = {
  value: propTypes.number,
};

ScalarDial.defaultProps = {
  value: 0,
};
