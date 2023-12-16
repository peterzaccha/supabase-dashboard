"use client";

import { supabaseForClientComponent } from "@/lib/supabase.client";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LogoutLink() {
  const supabase = supabaseForClientComponent;

  const router = useRouter();
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      router.replace("/");
      router.refresh();
    }
  }

  return (
    <Link href="#" onClick={logout}>
      Logout
    </Link>
  );
}
