import React, { useState, useMemo } from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Layer, Stage } from 'react-konva';

import { KonvaPolygon } from './KonvaPolygon';

import { Polygon } from '../math';
import * as mathUtils from '../math/utils';

import { getPolygonList } from '../selectors/polygons';

const PaddedContainer = styled.div`
  background-color: #ddd;
  margin: 3rem;
`;

export const SimulationView = ({ ...props }) => {
  const [width, setWidth] = useState(-1);

  const polygonList = useSelector(getPolygonList);
  const polygons = polygonList.map((polygon) => {
    const json = JSON.parse(polygon.get('polygon'));
    return polygon.set('polygon', Polygon.parseFromJson(json));
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
                        key={polygon.get('id')}
                        polygon={polygon.get('polygon')}
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
