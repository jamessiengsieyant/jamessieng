// Emails allowed to see James-only pages (Script, Prompt).
// Add any other address you actually sign in with.
export const OWNER_EMAILS = ["jamessieng@sieyant.com"];

export function isOwnerEmail(email?: string | null): boolean {
  return !!email && OWNER_EMAILS.includes(email.toLowerCase());
}
