import type { BillingDetails } from "../api/checkout.api";

export const COUNTRIES = ["Sri Lanka", "Viet Nam", "United States", "Indonesia"];
export const PROVINCES = ["Western Province", "Central Province", "Southern Province"];

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_PATTERN = /^[+]?[\d\s()-]{8,}$/;

export const billingDefaults: BillingDetails = {
  firstName: "",
  lastName: "",
  companyName: "",
  country: COUNTRIES[0] ?? "",
  streetAddress: "",
  city: "",
  province: PROVINCES[0] ?? "",
  zipCode: "",
  phone: "",
  email: "",
  additionalInformation: ""
};
