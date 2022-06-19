import React, { useState, useMemo } from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';

import { Layer, Stage } from 'react-konva';

import { KonvaPolygon } from '../KonvaPolygon';

import { Polygon } from '../../math';
import * as mathUtils from '../../math/utils';

const PaddedContainer = styled.div`
  background-color: #ddd;
  margin: 3rem;
`;

const generateRandomPolygon = () => {
  return Polygon.generateRandom(
    mathUtils.randRangeInt(3, 6 + 1),
  );
};

export const SimulationView = ({ ...props }) => {
  const [width, setWidth] = useState(-1);

  const [poly1, setPoly1] = useState(generateRandomPolygon());
  const [poly2, setPoly2] = useState(generateRandomPolygon());

  const polygons = [poly1, poly2];

  return (
    <PaddedContainer>
      <Measure
        bounds
        onResize={(rect) => {
          setWidth(rect.bounds.width);
        }}
      >
        {({ measureRef }) => {
          return (
            <div ref={measureRef}>
              <Stage width={width} height={width}>
                <Layer>
                  {polygons.map((polygon) => {
                    return (
                      <KonvaPolygon
                        polygon={polygon}
                        width={width}
                      />
                    );
                  })}
                </Layer>
              </Stage>
            </div>
          );
        }}
      </Measure>
    </PaddedContainer>
  );
};
