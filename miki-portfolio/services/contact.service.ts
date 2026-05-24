import { supabase } from "@/lib/supabase";

export async function submitContactForm(data: {
  name: string;
  email: string;
  telegram: string;
  message: string;
}) {
  const { error } = await supabase
    .from("contacts")
    .insert([data]);

  if (error) {
    throw error;
  }

  return true;
}