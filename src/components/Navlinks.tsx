
import Link from "next/link";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

const Navlinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result = await res.json();

  const navs: Category[] = Array.isArray(result.data)
    ? result.data
    : Array.isArray(result)
      ? result
      : [];

  return (
    <nav className=" flex flex-wrap items-center gap-6">
      {navs.map((n) => (
        <Link
          key={n.id}
          href={`/categories/${n.slug}`}
          className="text-black-700 font-light transition-colors hover:text-blue-600"
        >
          {n.icon} {n.nameBn}
        </Link>
      ))}
    </nav>
  );
};

export default Navlinks;
