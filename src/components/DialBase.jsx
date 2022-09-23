import React from 'react';
import styled from 'styled-components';

export const DialBase = styled.span`
  border: 2px solid #fff;
  border-radius: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-size: ${(props) => { return props.fontSize; }};

  width: 95px;
  height: 95px;
`;

DialBase.defaultProps = {
  fontSize: '60px',
};
