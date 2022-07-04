import Immutable from 'immutable';

import { SAVE_POLYGONS } from '../actions/polygons';

const initialState = Immutable.fromJS({
  polygons: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_POLYGONS: {
      const { payload: { polygons } } = action;

      return state.set('polygons', polygons);
    }

    default:
      return state;
  }
};
