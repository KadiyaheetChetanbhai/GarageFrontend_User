import { lazy } from "react";

// Other Pages
export const AboutUsPage = lazy(() => import("../pages/AboutUsPage"));
export const LandingPage = lazy(() => import("../pages/LandingPage.jsx"));
export const ContactUsPage = lazy(() => import("../pages/ContactUsPage"));
export const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicies.jsx"));
export const TermsOfServices = lazy(() =>
  import("../pages/TermsOfServices.jsx")
);

// Pet Service Flow
export const ClinicDetailsPage = lazy(() =>
  import("../pages/ClinicDetailPage.jsx")
);
export const PetClinicsAndMapPage = lazy(() =>
  import("../pages/PetClinicsAndMapPage.jsx")
);

// Food Diet Flow
export const DietPlans = lazy(() => import("../pages/DietPlansPage"));
export const StoreAndMaps = lazy(() => import("../pages/StoresAndMapPage.jsx"));
export const DietDetailPage = lazy(() => import("../pages/DietDetailPage.jsx"));

// Homemade Diet Flow
export const HomeMadeDiet = lazy(() => import("../pages/HomeMadeDietPage.jsx"));
export const HomeMadeDietDetailPage = lazy(() =>
  import("../pages/HomeMadeDietDetailPage.jsx")
);

// Symptoms Flow
export const DiseaseOverviewPage = lazy(() =>
  import("../pages/DiseaseOverviewPage.jsx")
);

// Error Pages
export const NotFoundPage = lazy(() => import("../pages/errors/NotFound.jsx"));
