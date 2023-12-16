import { createSupabaseForServerComponent } from "@/lib/supabase.server";
export default async function Page() {
  const supabase = createSupabaseForServerComponent();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <main className="p-5">
      <div>Welcom {session?.user.email}</div>
    </main>
  );
}
