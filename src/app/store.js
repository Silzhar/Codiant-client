import { configureStore } from '@reduxjs/toolkit';
import authenticateReducer from '../features/authenticateSlice';
import pseudocodeReducer from '../features/pseudocodeSlice';
import jsGameSliceReducer from '../features/JsGameSlice';
import dashboardReducer from '../features/dashboardSlice';
import sbsReducer from '../features/sbsSlice';

export default configureStore({
  reducer: {
    authenticate: authenticateReducer,
    pseudocode: pseudocodeReducer,
    jsGame: jsGameSliceReducer,
    dashboard: dashboardReducer,
    sbs: sbsReducer
  },
});
