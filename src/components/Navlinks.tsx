import CategoryLinks from "./CategoryLinks";

type Category = {
  id: number;
  slug: string;
  nameBn: string;
  icon: string;
  category?: string;
};

const Navlinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }

  const result = await res.json();

  const navs: Category[] = Array.isArray(result)
    ? result
    : Array.isArray(result.data)
      ? result.data
      : [];

  return <CategoryLinks navs={navs} />;
};

export default Navlinks;