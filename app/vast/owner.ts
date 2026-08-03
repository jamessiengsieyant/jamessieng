// Who may see /vast at all, and who may see the James-only pages.
//
// Clerk lets anyone create an account, and being signed in is NOT enough to
// view the presentation — the email must appear below. Add a guest here and
// redeploy to let them in; delete them to revoke access.

// Full access, including Script and Prompt.
export const OWNER_EMAILS = ["jamessieng@sieyant.com"];

// Presentation only: Role, Introduction, Topic 1, Topic 2, PowerPoint.
export const GUEST_EMAILS = [
  "vastguest@jamessieng.com",
];

export const ALLOWED_EMAILS = [...OWNER_EMAILS, ...GUEST_EMAILS];

function has(list: string[], email?: string | null): boolean {
  return !!email && list.includes(email.trim().toLowerCase());
}

export function isOwnerEmail(email?: string | null): boolean {
  return has(OWNER_EMAILS, email);
}

export function isAllowedEmail(email?: string | null): boolean {
  return has(ALLOWED_EMAILS, email);
}
