
"use client";

import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

import { useEffect, useState } from "react";

interface Product {
  id: number;
  nameBn: string;
  categoryIcon: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

export default function Marquee() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products"
        );

        const result = await res.json();

        setProducts(
          Array.isArray(result.data)
            ? result.data
            : Array.isArray(result)
              ? result
              : []
        );
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return null;
  }

  return ( 

<div className="bg-white-700 py-2 border-1 border-gray-400 text-black"> 

  <div className="mx-auto max-w-6xl ">

  <MarqueeText direction="right" duration={15}>

    <div className="overflow-hidden ">
      <div className="flex w-max ">
       
       
       
        {[...products, ...products].map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex shrink-0 items-center gap-2 px-6"
          >
            <span>{product.categoryIcon}</span>

            <span className="font-light">
              {product.nameBn}
            </span>

            <span className="font-medium py-0.5">
              {product.today}৳ /{product.unit}
            </span>

            <span
              className={
                product.change.dir === "up"
                  ? "text-red-600"
                  : "text-green-600"
              }
            >
              {product.change.dir === "up" ? "▲" : "▼"}
              {product.change.pct}%
            </span>

            <span className="ml-4 text-white/50">|</span> 


          </div> 


        ))}
      </div>
    </div> 
    </MarqueeText>

  </div>

</div>

  ); 
  
}
