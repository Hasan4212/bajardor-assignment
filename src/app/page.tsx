import Image from "next/image"; 
import Header from '../components/header'; 
import Marquee from '../components/marque'; 
import Banner from '../components/banner';

export default function Home() {
  return (
    <div>
  <Header></Header> 
  <Marquee></Marquee> 
  <Banner></Banner>
    </div>
  );
}
