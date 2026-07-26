import { cn } from "@react-workshop/ui/utils";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { resolveErrorMessage } from "@/utils/error-message";
import type { ContactMessage } from "../api/contact.api";
import { useSendContact } from "../hooks/use-send-contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const controlClass =
  "h-[65px] rounded-[10px] border border-muted px-6 font-normal outline-none transition-colors focus-visible:border-brand md:h-[75px] md:px-8";

export function ContactForm() {
  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();

  const sendContact = useSendContact();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<ContactMessage>({
    defaultValues: { name: "", email: "", subject: "", message: "" },
    mode: "onBlur"
  });

  const onSubmit = handleSubmit((values) => {
    sendContact.mutate(values, { onSuccess: () => reset() });
  });

  return (
    <form className="grid gap-8 md:gap-9" noValidate onSubmit={onSubmit}>
      <label className="grid gap-4 font-medium md:gap-5" htmlFor={nameId}>
        Your name
        <input
          aria-invalid={errors.name ? true : undefined}
          className={cn(controlClass, errors.name && "border-danger")}
          id={nameId}
          placeholder="Tai Le Tan"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Name must be at least 2 characters" }
          })}
        />
        {errors.name ? (
          <span className="text-sm font-normal text-danger" role="alert">
            {errors.name.message}
          </span>
        ) : null}
      </label>

      <label className="grid gap-4 font-medium md:gap-5" htmlFor={emailId}>
        Email address
        <input
          aria-invalid={errors.email ? true : undefined}
          className={cn(controlClass, errors.email && "border-danger")}
          id={emailId}
          placeholder="Tai.LeTan@nashtechglobal.com"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address" }
          })}
        />
        {errors.email ? (
          <span className="text-sm font-normal text-danger" role="alert">
            {errors.email.message}
          </span>
        ) : null}
      </label>

      <label className="grid gap-4 font-medium md:gap-5" htmlFor={subjectId}>
        Subject
        <input
          className={controlClass}
          id={subjectId}
          placeholder="This is optional"
          {...register("subject")}
        />
      </label>

      <label className="grid gap-4 font-medium md:gap-5" htmlFor={messageId}>
        Message
        <textarea
          aria-invalid={errors.message ? true : undefined}
          className={cn(
            "min-h-[120px] rounded-[10px] border border-muted px-6 py-6 font-normal outline-none transition-colors focus-visible:border-brand md:px-8",
            errors.message && "border-danger"
          )}
          id={messageId}
          placeholder="Hi, I would like to ask about"
          {...register("message", {
            required: "Message is required",
            minLength: { value: 10, message: "Message must be at least 10 characters" }
          })}
        />
        {errors.message ? (
          <span className="text-sm font-normal text-danger" role="alert">
            {errors.message.message}
          </span>
        ) : null}
      </label>

      <div className="grid gap-3">
        <button
          className="h-[55px] w-full max-w-[237px] rounded bg-brand text-white transition-colors hover:bg-brand-dark disabled:pointer-events-none disabled:opacity-60"
          disabled={sendContact.isPending}
          type="submit"
        >
          {sendContact.isPending ? "Sending..." : "Submit"}
        </button>

        {sendContact.isSuccess ? (
          <p className="font-medium text-fresh" role="status">
            Thanks for reaching out. Our team will reply shortly.
          </p>
        ) : null}

        {sendContact.isError ? (
          <p className="font-medium text-danger" role="alert">
            {resolveErrorMessage(sendContact.error)}
          </p>
        ) : null}
      </div>
    </form>
  );
}
