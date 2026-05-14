import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

type Bookmark = {
  id: string;
  gameName: string;
  tagLine: string;
  region: string;
};

export function useBookmarks(userId: string | null) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    fetchBookmarks();
  }, [userId]);

  async function fetchBookmarks() {
    const { data } = await supabase
      .from("Bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data) {
      setBookmarks(
        data.map((b) => {
          const [gameName, tagLine] = b.summoner_name.split("#");
          return { id: b.id, gameName, tagLine, region: b.region };
        })
      );
    }
    setIsLoading(false);
  }

  async function addBookmark(gameName: string, tagLine: string, region: string) {
    if (!userId) return;

    const already = bookmarks.some(
      (b) => b.gameName === gameName && b.tagLine === tagLine
    );
    if (already) return;

    const { data } = await supabase
      .from("Bookmarks")
      .insert({ user_id: userId, summoner_name: `${gameName}#${tagLine}`, region })
      .select()
      .single();

    if (data) {
      setBookmarks((prev) => [{ id: data.id, gameName, tagLine, region }, ...prev]);
    }
  }

  async function removeBookmark(id: string) {
    await supabase.from("Bookmarks").delete().eq("id", id);
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }

  return { bookmarks, isLoading, addBookmark, removeBookmark };
}
