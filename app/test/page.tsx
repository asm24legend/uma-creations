import { createClient } from "@/lib/supabase/server";

export default async function TestPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("name, price");
  const { data: orders } = await supabase.from("orders").select("id");

  return (
    <main style={{ padding: 24 }}>
      <h1>Connection test</h1>
      {error && <p>Error: {error.message}</p>}
      <p>Products visible: {products?.length ?? 0} (expect 4)</p>
      <p>Orders visible to the public: {orders?.length ?? 0} (expect 0)</p>
      <ul>
        {products?.map((p) => (
          <li key={p.name}>{p.name}: ₹{p.price}</li>
        ))}
      </ul>
    </main>
  );
}