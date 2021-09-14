import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import {useState} from 'react'
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import {addToBasket, removeFromBasket} from '../slice/basketSlice'



function CheckoutProduct({id, title,rating, price, description, category, image, hasPrime}) {

const dispatch = useDispatch()    

const addItemToBasket = ()=>{
    const product ={
      id, title, price, description, category, image,rating,hasPrime
    }
    dispatch(addToBasket(product))
  }
  
const removeItemFromBasket = ()=>{
    dispatch(removeFromBasket({id}))
  }


    return (
        <div className="grid grid-cols-5 shadow-md hover:shadow-xl ease-out duration-200 border-2 p-5 hover:scale-95">
            <Image src={image} height={200} width={200} objectFit="contain"/>

            {/* middle div */}
            <div className="col-span-3 mx-5">
                <p>{title}</p>

                        <div className="flex">
                        {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500" />
                    ))}
                        </div>

                        <p className="text-xs my-2 line-clamp-3">{description}</p>
                        <Currency quantity={price} currency="UGX"  />0
                        {hasPrime && (
        <div className="flex space-x-2 items-center">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next Day Delivery</p>
        </div>
      )}
            </div>

            {/* right button */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
            <button className="button " onClick={addItemToBasket}>Add</button>
            <button className="button remove" onClick={removeItemFromBasket}>Remove</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
