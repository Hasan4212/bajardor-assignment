
import Userinfo from './Body/userinfo';
import Navlinks from './Navlinks';

import Link from "next/link";

const Header = () => {
  

  const date = new Date().toLocaleDateString("bn-bd", {dateStyle:"full"})

  return (
    <header className="w-full  bg-white">
      {/* Top Header */}
      <div className="mx-auto flex max-w-6xl items-center justify-between  py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-xl font-bold text-white">
            ব
          </div>

          <div>
            <h1 className="text-base font-bold leading-5 text-gray-900">
              বাজার দর
            </h1>
            <p className="text-[13px] font-light text-gray-500">
              {date}
            </p>
          </div>
        </Link>

    
<div className="flex gap-3">
  {/* Sign In Button */}
  {/* <button
    className="cursor-pointer rounded-xl border border-gray-200 bg-white px-5 py-2.5
    text-sm font-semibold text-gray-700 shadow-sm
    transition-all duration-300 ease-in-out
    hover:border-green-600 hover:bg-green-50 hover:text-green-700
    active:scale-95"
  >
    সাইন ইন
  </button> */}

  {/* Sign Up Button */} 

<Userinfo/> 

</div>

      </div>
<div className='mx-auto max-w-6xl py-3'>
      <Navlinks/>
</div>
 
    </header>
  );
};

export default Header;
