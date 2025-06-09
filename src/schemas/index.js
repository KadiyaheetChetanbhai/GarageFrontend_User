import { z } from "zod";
import { PET_GENDERS } from "../constants";

// Contact Form Schema
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

// Booking Form Schema
export const appointmentSchema = z.object({
  customerDetails: z.object({
    name: z
      .string()
      .trim()
      .nonempty("Name is required")
      .refine(
        (val) => /^[A-Za-z\s-]+$/.test(val),
        "Name must not contain numbers or special characters"
      ),
    email: z
      .string()
      .trim()
      .nonempty("Email is required")
      .email({ message: "Invalid email address" }),
    mobile: z
      .string({
        invalid_type_error: "Phone number must be a number",
      })
      .trim()
      .nonempty("Phone number is required")
      .regex(/^[0-9]{10,13}$/, "Invalid phone number"),
    address: z.string().trim().nonempty("Address is required"),
  }),
  petDetails: z.object({
    name: z.string().trim().nonempty("Pet name is required"),
    age: z
      .string()
      .trim()
      .nonempty("Pet age is required")
      .regex(/^\d{1,2}(\.\d{1,2})?$/, "Please enter a valid age")
      .transform((val) => parseFloat(val)),
    breed: z
      .string()
      .trim()
      .nonempty("Pet Breed is required")
      .refine(
        (val) => /^[A-Za-z\s-]+$/.test(val),
        "Pet Breed must not contain numbers or special characters"
      ),
    sex: z.enum(PET_GENDERS, {
      message: "Pet sex is required",
    }),
    color: z
      .string()
      .trim()
      .nonempty("Pet color is required")
      .refine(
        (val) => /^[A-Za-z\s-]+$/.test(val),
        "Pet Color must not contain numbers or special characters"
      ),
    allergies: z.string().optional(),
  }),
});
