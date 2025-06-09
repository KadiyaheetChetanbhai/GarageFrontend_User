import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { showErrorToast } from "../../utils/toast";

const rawBaseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.VITE_BASE_URL || "https://petnow-be.testyourapp.online/",
  timeout: 1000 * 60 * 2,
});



export default async function baseQuery(args, api, extraOptions) {
  let result = await rawBaseQuery(args, api, extraOptions);
  if (result.error) showErrorToast(result.error.data.message);
  return result;
}
