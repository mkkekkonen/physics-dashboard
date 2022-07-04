import Immutable from 'immutable';

import { SET_STAGE_BOUNDS } from '../actions/simulation';

const initialState = Immutable.fromJS({
  width: 0,
  height: 0,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STAGE_BOUNDS: {
      const { width, height } = action.payload;

      return state.set('width', width)
        .set('height', height);
    }

    default:
      return state;
  }
};
