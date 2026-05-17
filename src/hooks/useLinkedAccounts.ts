import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export type LinkedAccount = {
  id: string;
  summoner_name: string;
  summoner_tag: string;
  summoner_region: string;
  is_primary: boolean;
};

export function useLinkedAccounts(user: User | null) {
  const [accounts, setAccounts] = useState<LinkedAccount[]>([]);

  useEffect(() => {
    if (!user) {
      setAccounts([]);
      return;
    }

    supabase
      .from("linked_accounts")
      .select("id, summoner_name, summoner_tag, summoner_region, is_primary")
      .eq("user_id", user.id)
      .order("created_at")
      .then(({ data }) => setAccounts(data ?? []));
  }, [user?.id]);

  async function addAccount(name: string, tag: string, region: string) {
    if (!user) return;

    const isFirst = accounts.length === 0;

    const { data } = await supabase
      .from("linked_accounts")
      .insert({ user_id: user.id, summoner_name: name, summoner_tag: tag, summoner_region: region, is_primary: isFirst })
      .select("id, summoner_name, summoner_tag, summoner_region, is_primary")
      .single();

    if (data) setAccounts((prev) => [...prev, data]);
  }

  async function removeAccount(id: string) {
    await supabase.from("linked_accounts").delete().eq("id", id);
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  }

  async function setPrimary(id: string) {
    if (!user) return;

    // Remove primary from all, then set on the selected one
    await supabase
      .from("linked_accounts")
      .update({ is_primary: false })
      .eq("user_id", user.id);

    await supabase
      .from("linked_accounts")
      .update({ is_primary: true })
      .eq("id", id);

    setAccounts((prev) =>
      prev.map((a) => ({ ...a, is_primary: a.id === id }))
    );
  }

  const primaryAccount = accounts.find((a) => a.is_primary) ?? null;

  return { accounts, primaryAccount, addAccount, removeAccount, setPrimary };
}
