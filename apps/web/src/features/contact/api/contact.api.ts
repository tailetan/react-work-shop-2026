import { endpoints } from "@/services/endpoints";
import { httpClient } from "@/services/http";

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

/** The mock endpoint answers 200 with an empty body, so there is nothing to parse. */
export async function sendContactMessage(payload: ContactMessage): Promise<void> {
  await httpClient.post<unknown, ContactMessage>(endpoints.contact, payload);
}
