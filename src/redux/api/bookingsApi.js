import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

const bookingsApi = createApi({
  reducerPath: "bookingsApi",
  baseQuery,
  tagTypes: ["Booking"],
  endpoints: (build) => ({
    getTimeSlots: build.query({
      query: (params) => ({
        url: `/bookings/time-slots`,
        method: "GET",
        params: {
          clinicId: params.clinicId,
          date: params.date,
        },
      }),
      invalidatesTags: [{ type: "Booking", id: "LIST" }],
    }),
    createBooking: build.mutation({
      query: (bookingData) => ({
        url: "/bookings",
        method: "POST",
        body: bookingData,
      }),
    }),
  }),
});

export const { useGetTimeSlotsQuery, useCreateBookingMutation } = bookingsApi;

export default bookingsApi;
