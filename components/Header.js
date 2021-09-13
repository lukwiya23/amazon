import Image from "next/image";
import {signIn, signOut, useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { selectItems } from "../slice/basketSlice";

function Header() {

  const [session] = useSession();
  const router = useRouter()
  const items= useSelector(selectItems)

  return (
    <header className="h-[104px] sticky">
      <div className=" flex items-center bg-amazon_blue P-1 flex-grow py-2">
        {/* LOGO */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
          onClick={()=>router.push('/')}
            className="cursor-pointer"
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
          />
        </div>

        {/* SEARCH BAR */}
        <div className=" bg-yellow-500 hover:bg-yellow-700 cursor-pointer hidden sm:flex items-center h-10 rounded-md flex-grow">
          <input
            className="p-2 h-full w-6 flex-grow outline-none rounded-l-md flex-shrink"
            type="text"
          />
          <SearchIcon className="p-4 h-12" />
        </div>

        {/* right div */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="link " onClick={!session?signIn:signOut}>
            <p className="font-extrabold md:text-sm"> {session ? `Hello, ${session.user.name}`:'Login or SignUp'}</p>
            {/* <p className="font-extrabold md:text-sm">Accounts & Lists</p> */}
          </div>
          <div className="link ">
            <p className="font-extrabold md:text-sm">Returns &</p>
            <p className="font-extrabold md:text-sm">Orders</p>
          </div>
          <div className="link flex items-center relative  " onClick={()=>router.push('/checkout')}>
            <span className="absolute top-0 right-0 md:top-0 md:right-10 bg-yellow-500 h-4 w-4 text-center rounded-full text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-8" />
            <p className="font-extrabold md:text-sm hidden md:inline mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* bottom nav */}
      <div className="bg-amazon_blue-light flex items-center text-white text-sm space-x-3 p-2 pl-6">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline">Electronics</p>
        <p className="link hidden lg:inline">Food & Grocery</p>
        <p className="link hidden lg:inline">Prime</p>
        <p className="link hidden lg:inline">Buy Again</p>
        <p className="link hidden lg:inline">Shopper Toolkit</p>
        <p className="link hidden lg:inline">Health & Personal care</p>
      </div>
    </header>
  );
}

export default Header;
