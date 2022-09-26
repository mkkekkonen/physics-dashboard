import React from 'react';
import styled from 'styled-components';

import * as uiConstants from '../constants/uiConstants';

const dialBaseDimensions = `${uiConstants.dialBaseDimensionsPx}px`;

export const DialBase = styled.span`
  border: 2px solid #fff;
  border-radius: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-size: ${(props) => { return props.fontSize; }};

  width: ${dialBaseDimensions};
  height: ${dialBaseDimensions};
`;

DialBase.defaultProps = {
  fontSize: '60px',
};
