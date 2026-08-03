import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isOwnerEmail } from "../owner";
import ScriptRehearsal from "./ScriptRehearsal";

export default async function ScriptPage() {
  const user = await currentUser();
  const owner = user?.emailAddresses?.some((e) => isOwnerEmail(e.emailAddress)) ?? false;
  if (!owner) redirect("/vast");
  return <ScriptRehearsal />;
}
