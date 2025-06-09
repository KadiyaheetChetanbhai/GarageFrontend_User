import { combineReducers } from "@reduxjs/toolkit";
import faqApi from "./api/faqApi";
import socialApi from "./api/socialApi";
import clinicsApi from "./api/clinicsApi";
import contactApi from "./api/contactApi";
import servicesApi from "./api/servicesApi";
import bookingsApi from "./api/bookingsApi";
import globalSlice from "./slices/globalSlice";
import newsLetterApi from "./api/newsLetterApi";
import cmsApi from "./api/cmsApi";
import contactInfoApi from "./api/contactInfoApi";
import dietaryRequirementsApi from "./api/dietaryRequirementsApi";
import dietsApi from "./api/dietsApi";
import symptomsApi from "./api/symptomsApi";
import diseasesBySymptomApi from "./api/diseasesBySymptomsApi";
import { homemadeDietsApi } from "./api/homeMadeDietsApi";
import brandApi from "./api/brandApi";
import helpfulResourcesApi from "./api/helpFullResourcesApi";


import stores, { storesApi } from "./api/storesApi";


const rootReducer = combineReducers({
  global: globalSlice,
  [faqApi.reducerPath]: faqApi.reducer,
  [socialApi.reducerPath]: socialApi.reducer,
  [clinicsApi.reducerPath]: clinicsApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [servicesApi.reducerPath]: servicesApi.reducer,
  [bookingsApi.reducerPath]: bookingsApi.reducer,
  [newsLetterApi.reducerPath]: newsLetterApi.reducer,
  [cmsApi.reducerPath]:cmsApi.reducer,
  [contactInfoApi.reducerPath]:contactInfoApi.reducer,
  [dietaryRequirementsApi.reducerPath]:dietaryRequirementsApi.reducer,
  [dietsApi.reducerPath]:dietsApi.reducer,
  [symptomsApi.reducerPath]:symptomsApi.reducer,
  [diseasesBySymptomApi.reducerPath]:diseasesBySymptomApi.reducer,
  [storesApi.reducerPath]:storesApi.reducer,
  [homemadeDietsApi.reducerPath]:homemadeDietsApi.reducer,
  [brandApi.reducerPath]:brandApi.reducer,
  [helpfulResourcesApi.reducerPath]: helpfulResourcesApi.reducer,
});

export default rootReducer;
