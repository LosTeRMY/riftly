import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export function useProfile(user: User | null) {
  const [avatarUrl, setAvatarUrl] = useState<string>(
    user?.user_metadata?.picture ?? "/avatars/default-avatar1.webp"
  );

  useEffect(() => {
    if (!user) {
      setAvatarUrl("/avatars/default-avatar1.webp");
      return;
    }

    supabase
      .from("profiles")
      .select("avatar_url")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        setAvatarUrl(data?.avatar_url ?? user.user_metadata?.picture ?? "/avatars/default-avatar1.webp");
      });
  }, [user?.id]);

  return { avatarUrl, setAvatarUrl };
}
