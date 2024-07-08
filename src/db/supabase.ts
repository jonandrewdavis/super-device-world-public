import { createClient, PostgrestSingleResponse } from "@supabase/supabase-js";
import { InsertItem, SelectItem } from "./schema";
import { useEffect } from "react";

// TODO: Connect via Drizzle for end to end type saftey
// https://supabase.com/docs/guides/database/connecting-to-postgres#connecting-with-drizzle

// ALSO:
// Supabase will generate types as well
// https://supabase.com/docs/reference/javascript/typescript-support

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
);

export const fetchItems = async (): Promise<
  PostgrestSingleResponse<SelectItem[]>
> => {
  return await supabase.from("items_table").select();
};

// We have some types inferred from Drizzle, but they don't match the hand written ones (of course).
export const createItem = async (item: InsertItem) => {
  return await supabase.from("items_table").insert([item]).select();
};

export type UseSubscriptionConfig = {
  event?: any;
  table?: string;
};

export const useSubscription = (callback: (payload: any) => void) => {
  useEffect(() => {
    const subscription = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "items_table" },
        callback,
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);
};
