import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import {addToBasket} from '../slice/basketSlice'

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {

  const dispatch = useDispatch()

  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const addItemToBasket = ()=>{
    const product ={
      id, title, price, description, category, image,rating,hasPrime
    }
    dispatch(addToBasket(product))
  }

  const [hasPrime] = useState(Math.random() < 0.5);

  return (
    <div className="relative flex flex-col border m-5 bg-white z-10 p-10 rounded-lg hover:shadow-xl shadow-md transition-all duration-200 hover:scale-95 ease-out">
      <p className="absolute top-2 right-5 text-cs italic text-gray-400">
        {category}
      </p>
      <Image src={image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3">{title}</h4>
        <div className="flex">
            {Array(rating)
            .fill()
            .map((_, i) => (
                <StarIcon className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 truncate">{description}</p>

        <div className="mb-5">
            <Currency quantity={price} currency="UGX" />
            0
        </div>
        
         {hasPrime && (
        <div className="flex space-x-2 items-center -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next Day Delivery</p>
        </div>
      )}

      <button className="mt-auto button" onClick={addItemToBasket}>Add to Cart</button>
    </div>
  );
}

export default Product;
