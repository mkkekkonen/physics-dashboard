import React, { useState, useMemo } from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Layer, Stage } from 'react-konva';

import { KonvaPolygon } from './KonvaPolygon';

import { Polygon } from '../math';
import * as mathUtils from '../math/utils';

import { getPolygonJson } from '../selectors/polygons';

const PaddedContainer = styled.div`
  background-color: #ddd;
  margin: 3rem;
`;

export const SimulationView = ({ ...props }) => {
  const [width, setWidth] = useState(-1);

  const polyJson = useSelector(getPolygonJson);
  const polygons = polyJson.map((jsonStr) => {
    const json = JSON.parse(jsonStr);
    return Polygon.parseFromJson(json);
  });

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
                        stageWidth={width}
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
