
export const instant = false;

import Banner from "../components/banner";
import PriceUp from "../components/Body/priceUp";
import PriceDown from "../components/Body/priceDown";
import AllProducts from "../components/Body/AllProducts";

export default function Home() {
  return (
    <div>
      <Banner />
      <PriceUp />
      {/* <Body /> */}
      <PriceDown />
      <AllProducts />
    </div>
  );
}
