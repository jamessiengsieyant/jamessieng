import { currentUser } from "@clerk/nextjs/server";
import { isAllowedEmail, isOwnerEmail } from "./owner";
import AccessDenied from "./AccessDenied";
import VastChrome from "./VastChrome";

export default async function VastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Local dev runs without Clerk (see proxy.ts), so treat it as the owner.
  const devBypass = process.env.NODE_ENV !== "production";

  const user = devBypass ? null : await currentUser();
  const emails = user?.emailAddresses?.map((e) => e.emailAddress) ?? [];

  const allowed = devBypass || emails.some(isAllowedEmail);
  const owner = devBypass || emails.some(isOwnerEmail);

  if (!allowed) return <AccessDenied email={emails[0]} />;

  return <VastChrome owner={owner}>{children}</VastChrome>;
}
