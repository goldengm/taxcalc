import { combineReducers } from 'redux';

import home from './home/reducer';
import setting from './setting/reducer';

const rootReducer = combineReducers({
  home,
  setting
});

export default rootReducer;
