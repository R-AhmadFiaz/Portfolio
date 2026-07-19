import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Admin Login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <div className="flex min-h-[80svh] items-center justify-center px-6 py-24">
      <LoginForm />
    </div>
  );
}
