import type { Metadata } from "next";
import { cookies } from "next/headers";
import { CreateCollectionForm } from "@/components/create-collection-form";
import { CreateUnlockGate } from "@/components/create-unlock-gate";
import {
  CREATE_AUTH_COOKIE,
  isCreatorAccessConfigured,
  isCreatorAuthorized,
} from "@/lib/create-access";

export const metadata: Metadata = {
  title: "Create a Collection",
  robots: { index: false, follow: false },
};

export default async function CreatePage() {
  const configured = isCreatorAccessConfigured();
  const store = await cookies();
  const authorized = isCreatorAuthorized(
    store.get(CREATE_AUTH_COOKIE)?.value
  );

  if (configured && !authorized) {
    return <CreateUnlockGate configured />;
  }

  return <CreateCollectionForm />;
}
