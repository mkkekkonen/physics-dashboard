import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import * as mathUtils from '../math/utils';

import { getPolygonList } from '../selectors/polygons';

import { DIAL_TYPES } from '../constants/uiConstants';

import { Dial } from './Dial';

const Wrapper = styled.div`
  background-color: #ddd;
  max-width: 800px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;

   @media only screen and (max-width: 800px) {
    width: 100vw;
   }
`;

export const ContentView = () => {
  const polygons = useSelector(getPolygonList);

  const firstPolygon = polygons.get(0);

  return (
    <Wrapper>
      {firstPolygon && (
        <>
          <Dial
            label="Mass"
            value={firstPolygon.get('mass')}
            type={DIAL_TYPES.SCALAR}
            unit="kg"
          />
          <Dial
            label="Position"
            value={firstPolygon.get('position')}
            type={DIAL_TYPES.COORDS}
            unit="px"
          />
          <Dial
            label="Rotation"
            value={mathUtils.radiansToDegrees(firstPolygon.get('rotation')) % 360}
            type={DIAL_TYPES.ANGLE}
            unit="deg"
          />
        </>
      )}
    </Wrapper>
  );
};
