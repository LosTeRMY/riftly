import { useRef } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

async function upsertAvatar(userId: string, url: string) {
  await supabase
    .from("profiles")
    .upsert({ user_id: userId, avatar_url: url }, { onConflict: "user_id" });
}

export function useAvatarUpload(user: User | null, onClose: () => void, setAvatarUrl: (url: string) => void) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image too large. Maximum size is 2MB.");
      return;
    }

    const ext = file.name.split(".").pop();
    const path = `${user.id}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("Avatars")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      alert("Upload failed. Please try again.");
      return;
    }

    const { data } = supabase.storage.from("Avatars").getPublicUrl(path);
    const url = `${data.publicUrl}?t=${Date.now()}`;

    await upsertAvatar(user.id, url);
    setAvatarUrl(url);
    onClose();
  }

  async function handleResetAvatar() {
    const defaultUrl = user?.user_metadata?.picture ?? "/avatars/default-avatar1.webp";
    if (user) await upsertAvatar(user.id, defaultUrl);
    setAvatarUrl(defaultUrl);
    onClose();
  }

  async function handleSelectPreset(url: string) {
    if (user) await upsertAvatar(user.id, url);
    setAvatarUrl(url);
    onClose();
  }

  return { fileInputRef, handleAvatarChange, handleResetAvatar, handleSelectPreset };
}
