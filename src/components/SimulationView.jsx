import React from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Layer, Stage } from 'react-konva';
import Immutable from 'immutable';

import { KonvaPolygon } from './KonvaPolygon';

import { setStageBounds } from '../actions/simulation';
import { updatePolygons } from '../actions/polygons';

import { getPolygonList } from '../selectors/polygons';
import { getStageBounds } from '../selectors/simulation';

const PaddedContainer = styled.div`
  background-color: #ddd;
  margin: 30px;
`;

const FRAME_LENGTH = 1000 / 60;

class SimulationViewCls extends React.Component {
  constructor(props) {
    super(props);
    this.lastTime = 0;
  }

  componentDidMount() {
    requestAnimationFrame(this.animateFrame);
  }

  animateFrame = (now) => {
    const { updatePolygons } = this.props;

    const delta = now - this.lastTime;
    if (delta >= FRAME_LENGTH) {
      updatePolygons(delta);
      this.lastTime = now;
    }

    requestAnimationFrame(this.animateFrame);
  };

  render() {
    const {
      bounds,
      polygons,
      setStageBounds,
    } = this.props;
    const { width, height } = bounds.toJS();

    return (
      <PaddedContainer>
        <Measure
          bounds
          onResize={(rect) => {
            const _width = rect.bounds.width;
            if (_width !== width) {
              setStageBounds(_width, _width);
            }
          }}
        >
          {({ measureRef }) => {
            return (
              <div ref={measureRef}>
                <Stage width={width} height={height}>
                  <Layer>
                    {polygons.map((polygon) => {
                      return (
                        <KonvaPolygon
                          key={polygon.get('id')}
                          polygon={polygon.get('polygon')}
                          position={polygon.get('position')}
                          stageWidth={width}
                          stageHeight={height}
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
  }
}

SimulationViewCls.propTypes = {
  bounds: PropTypes.instanceOf(Immutable.Map),
  polygons: PropTypes.instanceOf(Immutable.List),
  setStageBounds: PropTypes.func.isRequired,
  updatePolygons: PropTypes.func.isRequired,
};

SimulationViewCls.defaultProps = {
  bounds: {
    width: 0,
    height: 0,
  },
  polygons: Immutable.List(),
};

const mapStateToProps = (state) => {
  return {
    bounds: getStageBounds(state),
    polygons: getPolygonList(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setStageBounds: (width, height) => {
      return dispatch(setStageBounds(width, height));
    },
    updatePolygons: (delta) => {
      return dispatch(updatePolygons(delta));
    },
  };
};

export const SimulationView = connect(mapStateToProps, mapDispatchToProps)(SimulationViewCls);
