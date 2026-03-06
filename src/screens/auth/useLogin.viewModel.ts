import { router } from "expo-router";
import { useState } from "react";

import { useAuthStore } from "@/shared/stores/auth.store";

export function useLoginViewModel() {
  const [username, setUsername] = useState("");

  const { setAuthenticated } = useAuthStore();

  function handleSubmit() {
    if (username.trim() === "") {
      return;
    }

    setAuthenticated(username);
    router.replace("/home");
  }

  return {
    username,
    setUsername,
    handleSubmit,
  };
}
