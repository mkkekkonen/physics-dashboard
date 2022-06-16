import React, { useState } from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';

import { Layer, Stage } from 'react-konva';

const PaddedContainer = styled.div`
  background-color: #ddd;
  margin: 3rem;
`;

export const SimulationView = ({ ...props }) => {
  const [width, setWidth] = useState(-1);

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
                <Layer />
              </Stage>
            </div>
          );
        }}
      </Measure>
    </PaddedContainer>
  );
};
