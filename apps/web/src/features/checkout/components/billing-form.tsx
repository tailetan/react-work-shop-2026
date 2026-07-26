import { cn } from "@react-workshop/ui/utils";
import type { ReactNode } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { BillingDetails } from "../api/checkout.api";
import {
  COUNTRIES,
  EMAIL_PATTERN,
  PHONE_PATTERN,
  PROVINCES,
  billingDefaults
} from "../utils/billing";

const controlClass =
  "h-[65px] rounded-[10px] border border-muted px-6 font-normal outline-none transition-colors focus-visible:border-brand md:h-[75px]";

export type BillingFormProps = {
  formId: string;
  onSubmit: (values: BillingDetails) => void;
};

function Field({
  children,
  error,
  label
}: {
  children: ReactNode;
  error?: FieldError;
  label: string;
}) {
  return (
    <label className="grid gap-4 font-medium md:gap-5">
      {label}
      {children}
      {error ? (
        <span className="text-sm font-normal text-danger" role="alert">
          {error.message}
        </span>
      ) : null}
    </label>
  );
}

function TextField({
  error,
  label,
  registration,
  type = "text"
}: {
  error?: FieldError;
  label: string;
  registration: UseFormRegisterReturn;
  type?: string;
}) {
  return (
    <Field error={error} label={label}>
      <input
        aria-invalid={error ? true : undefined}
        className={cn(controlClass, error && "border-danger")}
        type={type}
        {...registration}
      />
    </Field>
  );
}

export function BillingForm({ formId, onSubmit }: BillingFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<BillingDetails>({ defaultValues: billingDefaults, mode: "onBlur" });

  return (
    <form className="grid gap-8 md:gap-9" id={formId} noValidate onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-1 text-3xl font-semibold md:text-4xl">Billing details</h2>

      <div className="grid gap-8 sm:grid-cols-2">
        <TextField
          error={errors.firstName}
          label="First Name"
          registration={register("firstName", { required: "First name is required" })}
        />
        <TextField
          error={errors.lastName}
          label="Last Name"
          registration={register("lastName", { required: "Last name is required" })}
        />
      </div>

      <TextField
        label="Company Name (Optional)"
        registration={register("companyName")}
      />

      <Field error={errors.country} label="Country / Region">
        <select className={cn(controlClass, "text-muted")} {...register("country")}>
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </Field>

      <TextField
        error={errors.streetAddress}
        label="Street address"
        registration={register("streetAddress", { required: "Street address is required" })}
      />

      <TextField
        error={errors.city}
        label="Town / City"
        registration={register("city", { required: "Town or city is required" })}
      />

      <Field error={errors.province} label="Province">
        <select className={cn(controlClass, "text-muted")} {...register("province")}>
          {PROVINCES.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </Field>

      <TextField
        error={errors.zipCode}
        label="ZIP code"
        registration={register("zipCode", {
          required: "ZIP code is required",
          minLength: { value: 4, message: "ZIP code must be at least 4 characters" }
        })}
      />

      <TextField
        error={errors.phone}
        label="Phone"
        registration={register("phone", {
          required: "Phone is required",
          pattern: { value: PHONE_PATTERN, message: "Enter a valid phone number" }
        })}
        type="tel"
      />

      <TextField
        error={errors.email}
        label="Email address"
        registration={register("email", {
          required: "Email is required",
          pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address" }
        })}
        type="email"
      />

      <label className="grid gap-2">
        <span className="sr-only">Additional information</span>
        <textarea
          className="min-h-[75px] rounded-[10px] border border-muted px-6 py-6 outline-none transition-colors focus-visible:border-brand"
          placeholder="Additional information"
          {...register("additionalInformation")}
        />
      </label>
    </form>
  );
}
