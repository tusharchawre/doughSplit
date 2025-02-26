import SignIn from "@/app/sign-in";
import { useSession } from "@/context/ctx";
import { Redirect } from "expo-router";
import { PropsWithChildren } from "react";

export function AuthGuard({ children }: PropsWithChildren) {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return children;
}
