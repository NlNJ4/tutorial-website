"use client";

import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateUnlockGate({
  configured,
}: {
  configured: boolean;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/create-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not unlock.");
        return;
      }
      router.refresh();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 md:py-24">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="size-5 text-primary" aria-hidden />
            Creator access
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {configured ? (
            <>
              <p className="text-sm text-muted-foreground">
                The collection builder is only for the site owner. Enter your
                creator password to continue — learners do not need an account.
              </p>
              <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="creator-password">Password</Label>
                  <Input
                    id="creator-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}
                <Button type="submit" disabled={loading || !password.trim()}>
                  {loading ? "Checking…" : "Unlock"}
                </Button>
              </form>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Creator protection is not enabled. Set{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                LEARNLY_CREATE_PASSWORD
              </code>{" "}
              in your environment (e.g. <code className="text-xs">.env.local</code>
              ) to require a password on this page in production.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
