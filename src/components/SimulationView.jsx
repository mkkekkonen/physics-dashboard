import React from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { Layer, Stage } from 'react-konva';

import { KonvaPolygon } from './KonvaPolygon';

import { Polygon } from '../math';

import { setStageBounds } from '../actions/simulation';

import { getPolygonList } from '../selectors/polygons';
import { getStageBounds } from '../selectors/simulation';

const PaddedContainer = styled.div`
  background-color: #ddd;
  margin: 30px;
`;

export const SimulationView = ({ ...props }) => {
  const dispatch = useDispatch();
  const { width, height } = useSelector(getStageBounds);

  const polygonList = useSelector(getPolygonList);
  const polygons = polygonList.map((polygon) => {
    const _polygon = polygon.get('polygon');
    return polygon.set('polygon', _polygon);
  });

  return (
    <PaddedContainer>
      <Measure
        bounds
        onResize={(rect) => {
          const _width = rect.bounds.width;
          dispatch(setStageBounds(_width, _width));
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
