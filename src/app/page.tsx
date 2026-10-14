import Image from "next/image"; 
import Header from '../components/header'; 
import Marquee from '../components/marque'; 
import Banner from '../components/banner'; 
import PriceUp from '../components/Body/priceUp';
import PriceDown from '../components/Body/priceDown';
import AllProducts from '../components/Body/AllProducts'; 
import Footer from '../components/Footer';


export default function Home() {
  return (
    <div>
  <Header></Header> 
  <Marquee></Marquee> 
  <Banner></Banner> 
  <PriceUp></PriceUp>
  {/* <Body></Body>  */}
  <PriceDown></PriceDown> 
  <AllProducts></AllProducts>
<Footer></Footer>

    </div>
  );
}
