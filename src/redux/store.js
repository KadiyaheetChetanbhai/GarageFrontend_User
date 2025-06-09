import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import faqApi from "./api/faqApi";
import socialApi from "./api/socialApi";
import rootReducer from "./rootReducers";
import clinicsApi from "./api/clinicsApi";
import contactApi from "./api/contactApi";
import servicesApi from "./api/servicesApi";
import bookingsApi from "./api/bookingsApi";
import newsLetterApi from "./api/newsLetterApi";
import { cmsApi } from "./api/cmsApi";
import contactInfoApi from "./api/contactInfoApi";
import dietaryRequirementsApi from "./api/dietaryRequirementsApi";
import dietsApi from "./api/dietsApi";
import symptomsApi from "./api/symptomsApi";
import diseasesBySymptomApi from "./api/diseasesBySymptomsApi";
import storesApi from "./api/storesApi";
import { homemadeDietsApi } from "./api/homeMadeDietsApi";
import brandApi from "./api/brandApi";
import helpfulResourcesApi from "./api/helpFullResourcesApi";

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(faqApi.middleware)
      .concat(clinicsApi.middleware)
      .concat(contactApi.middleware)
      .concat(servicesApi.middleware)
      .concat(bookingsApi.middleware)
      .concat(socialApi.middleware)
      .concat(newsLetterApi.middleware)
      .concat(cmsApi.middleware)
      .concat(contactInfoApi.middleware)
      .concat(dietaryRequirementsApi.middleware)
      .concat(dietsApi.middleware)
      .concat(symptomsApi.middleware)
      .concat(diseasesBySymptomApi.middleware)
      .concat(storesApi.middleware)
      .concat(homemadeDietsApi.middleware)
      .concat(brandApi.middleware)
      .concat(helpfulResourcesApi.middleware)
});

setupListeners(store.dispatch);
