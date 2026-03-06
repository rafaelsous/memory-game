import { Redirect } from "expo-router";

import { useAuthStore } from "@/shared/stores/auth.store";

export default function Index() {
  const { user } = useAuthStore();

  return <Redirect href={user ? "/home" : "/login"} />;
}
