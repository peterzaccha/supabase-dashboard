"use client";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BusinessForm, {
  BusinessFormProps,
} from "@/utility-components/BusinessForm";
export default function Page() {
  const router = useRouter();
  const supabase = supabaseForClientComponent;

  const submit: BusinessFormProps["onSubmit"] = async function (data) {
    if (!data.name) {
      toast.error("Business name cannot be empty");
      return;
    }
    const { error } = await supabase.from("businesses").insert(data);
    if (error) {
      toast.error(error.message);
    } else {
      router.push("/admin/internal/businesses");
    }
  };
  return (
    <main className="p-5">
      <div className="bg-white px-4 py-6 rounded flex gap-3 flex-col">
        <div className="text-gray-700 text-lg ">Create New Business</div>
        <BusinessForm onSubmit={submit} />
      </div>
    </main>
  );
}
