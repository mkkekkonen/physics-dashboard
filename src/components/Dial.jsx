import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import { ScalarDial } from './ScalarDial';
import { ScalarDial2 } from './ScalarDial2';
import { CoordsDial } from './CoordsDial';
import { AngleDial } from './AngleDial';
import { VectorDial } from './VectorDial';

import * as uiConstants from '../constants/uiConstants';

const { DIAL_TYPES } = uiConstants;

const DialLayout = styled.div`
  display: inline-flex;
  flex-direction: column;

  margin: 5px;
`;

const DialPanel = styled.div`
  border: 1px solid ${uiConstants.dark};

  display: flex;
  justify-content: center;

  background-color: ${uiConstants.darkBlue};
  color: #fff;

  box-sizing: border-box;
  padding: 0.5rem;
  width: ${uiConstants.dialDimensions};
`;

const DialHeader = styled(DialPanel)`
  border-top-left-radius: ${uiConstants.borderRadius};
  border-top-right-radius: ${uiConstants.borderRadius};
`;

const DialContainer = styled.div`
  background-color: ${uiConstants.darkBlue};
  box-sizing: border-box;

  border-left: 1px solid ${uiConstants.dark};
  border-right: 1px solid ${uiConstants.dark};

  display: flex;
  align-items: center;
  justify-content: center;

  width: ${uiConstants.dialDimensions + 20}px;
  height: ${uiConstants.dialDimensions}px;
`;

const DialUnit = styled(DialPanel)`
  border-bottom-left-radius: ${uiConstants.borderRadius};
  border-bottom-right-radius: ${uiConstants.borderRadius};
`;

export const Dial = ({
  label,
  value,
  negative,
  type,
  unit,
  ...props
}) => {
  return (
    <DialLayout>
      <DialHeader>{label}</DialHeader>
      <DialContainer>
        {type === DIAL_TYPES.SCALAR && (
          <ScalarDial value={value} />
        )}
        {type === DIAL_TYPES.SCALAR2 && (
          <ScalarDial2
            value={value}
            negative={negative}
          />
        )}
        {type === DIAL_TYPES.COORDS && (
          <CoordsDial coords={value} />
        )}
        {type === DIAL_TYPES.ANGLE && (
          <AngleDial angle={value} />
        )}
        {type === DIAL_TYPES.VECTOR && (
          <VectorDial vector={value} />
        )}
      </DialContainer>
      <DialUnit>{unit}</DialUnit>
    </DialLayout>
  );
};

Dial.propTypes = {
  label: propTypes.string,
  value: propTypes.oneOfType([
    propTypes.number,
  ]),
  negative: propTypes.bool,
  type: propTypes.oneOf([
    DIAL_TYPES.SCALAR,
  ]).isRequired,
  unit: propTypes.string,
};

Dial.defaultProps = {
  label: '-',
  value: 0,
  negative: false,
  unit: '?',
};