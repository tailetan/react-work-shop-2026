import { useId } from "react";
import { useForm } from "react-hook-form";

type NewsletterValues = {
  email: string;
};

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const emailId = useId();
  const {
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    register,
    reset
  } = useForm<NewsletterValues>({ defaultValues: { email: "" } });

  const onSubmit = handleSubmit(() => {
    // The mock API has no newsletter endpoint; confirm locally and reset.
    reset();
  });

  return (
    <form className="grid gap-2" noValidate onSubmit={onSubmit}>
      <div className="flex gap-3">
        <label className="sr-only" htmlFor={emailId}>
          Email address
        </label>
        <input
          aria-invalid={errors.email ? true : undefined}
          className="min-w-0 flex-1 border-b border-black py-1 text-sm outline-none placeholder:text-muted focus-visible:border-brand"
          id={emailId}
          placeholder="Enter Your Email Address"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address" }
          })}
        />
        <button
          className="border-b border-black py-1 text-sm font-medium uppercase transition-colors hover:text-brand"
          type="submit"
        >
          Subscribe
        </button>
      </div>

      {errors.email ? (
        <p className="text-xs text-danger" role="alert">
          {errors.email.message}
        </p>
      ) : null}

      {isSubmitSuccessful && !errors.email ? (
        <p className="text-xs text-fresh" role="status">
          Thanks for subscribing.
        </p>
      ) : null}
    </form>
  );
}
