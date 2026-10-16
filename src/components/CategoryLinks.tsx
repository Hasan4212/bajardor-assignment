
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Category = {
  id: number;
  slug: string;
  nameBn: string;
  icon: string;
  category?: string;
};

type Props = {
  navs: Category[];
};

const CategoryLinks = ({ navs }: Props) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-3">
      {navs.map((n) => {
        const href = `/category/${n.category ?? n.slug}`;
        const isActive = pathname === href;

        return (
          <Link
            key={n.id}
            href={href}
            className={`rounded-lg px-3 py-2 font-light transition-colors ${
              isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-green-100 hover:text-green-700"
            }`}
          >
            {n.icon} {n.nameBn}
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryLinks;
