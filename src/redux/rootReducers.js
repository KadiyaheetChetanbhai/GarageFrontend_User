import { combineReducers } from "@reduxjs/toolkit";



import stores, { storesApi } from "./api/storesApi";


const rootReducer = combineReducers({
  global: globalSlice,

});

export default rootReducer;
