
import ProductCategoryClient from "@/components/product-category-client";

export const instant = false;

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

type Props = {
  params: Promise<{
    categoryid: string;
  }>;
};

const ProductCategory = async ({ params }: Props) => {
  const { categoryid } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${encodeURIComponent(categoryid)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const categoryProducts: Product[] = await res.json();

  return (
    <ProductCategoryClient
      products={categoryProducts}
      categoryid={categoryid}
    />
  );
};

export default ProductCategory;
