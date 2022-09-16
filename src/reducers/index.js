import { combineReducers } from '@reduxjs/toolkit';

import polygons from './polygons';
import simulation from './simulation';

export default combineReducers({
  polygons,
  simulation,
});
