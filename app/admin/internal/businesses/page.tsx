import { createSupabaseForServerComponent } from "@/lib/supabase.server";
import Button from "@/utility-components/Button";
import Link from "next/link";
export default async function Page() {
  const supabase = createSupabaseForServerComponent();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase.from("businesses").select("name,id");

  return (
    <main className="px-6 py-5">
      <div className="flex justify-between py-6 items-center">
        <h2>Businesses</h2>
        <Link
          href="/admin/internal/businesses/new"
          className="bg-white text-black rounded px-3 py-2"
        >
          Add New
        </Link>
      </div>
      <table className="w-full text-left text-gray-700">
        <thead className="uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row) => (
              <tr key={row.id} className="bg-white border-b ">
                <td className="px-6 py-4">{row.id}</td>
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/internal/businesses/${row.id}/edit`}
                    className="bg-gray-500 px-3 py-2 rounded text-white"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          {error && (
            <tr className="bg-white border-b ">
              <td className="px-6 py-4">{error.message}</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
