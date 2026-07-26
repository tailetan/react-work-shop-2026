import { useMutation } from "@tanstack/react-query";
import { sendContactMessage, type ContactMessage } from "../api/contact.api";

export function useSendContact() {
  return useMutation<void, Error, ContactMessage>({
    mutationFn: sendContactMessage
  });
}
