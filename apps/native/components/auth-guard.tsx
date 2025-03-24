import { useSession } from "@/context/ctx";
import { Redirect, usePathname } from "expo-router";
import { PropsWithChildren } from "react";

export function AuthGuard({
  children,
  publicRoutes = ["/sign-in", "/sign-up"],
}: PropsWithChildren<{
  publicRoutes?: string[];
}>) {
  const { session, isLoading } = useSession();
  const currentPath = usePathname();
  if (isLoading) {
    return null;
  }

  if (publicRoutes.includes(currentPath)) {
    return children;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return children;
}
