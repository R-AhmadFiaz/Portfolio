import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ContactsTable } from "@/components/dashboard/contacts-table";
import { LogoutButton } from "@/components/dashboard/logout-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({ title: "Dashboard", noIndex: true });

const PAGE_SIZE = 20;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const [contacts, totalCount] = await Promise.all([
    prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
    }),
    prisma.contact.count(),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Signed in as {session.user.email}</p>
        </div>
        <LogoutButton />
      </div>

      <Card className="mt-8 max-w-xs">
        <CardHeader>
          <CardTitle>Total submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">{totalCount}</p>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Contact submissions</h2>
        <ContactsTable contacts={contacts} page={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
