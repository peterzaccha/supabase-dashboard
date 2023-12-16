"use client";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import BusinessForm, {
  BusinessFormProps,
} from "@/utility-components/BusinessForm";
import { useEffect, useState } from "react";
import { set } from "zod";
export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [business, setBusiness] = useState<{ name: string } | null>(null);
  const router = useRouter();
  const { id } = useParams();

  const supabase = supabaseForClientComponent;
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select("name")
        .eq("id", id);
      if (error) {
        toast.error(error.message);
        router.push("/admin/internal/businesses");
        return;
      }
      if (data?.length === 0) {
        toast.error(`Business with id ${id} not found`);
        router.push("/admin/internal/businesses");
        return;
      } else {
        setBusiness(data[0]);
      }
      setLoading(false);
    })();
  }, []);

  const submit: BusinessFormProps["onSubmit"] = async function (data) {
    if (!data.name) {
      toast.error("Business name cannot be empty");
      return;
    }
    const { error } = await supabase
      .from("businesses")
      .update(data)
      .eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      router.push("/admin/internal/businesses");
    }
  };
  return (
    <main className="p-5">
      <div className="bg-white px-4 py-6 rounded flex gap-3 flex-col">
        <div className="text-gray-700 text-lg ">Update Business</div>
        {loading ? (
          <p className="text-black">Loading...</p>
        ) : (
          <BusinessForm
            buttonLabel="Update"
            onSubmit={submit}
            name={business?.name}
          />
        )}
      </div>
    </main>
  );
}
