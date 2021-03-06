import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slice/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSession } from "next-auth/client";
import Currency from "react-currency-formatter";
import {loadStripe} from '@stripe/stripe-js'
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key)

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [session] = useSession();

  //CREATE SESSION TO LOAD BACKEND ENDPOINT
  const createCheckoutSession = async()=>{
    const stripe = await stripePromise;

    const checkoutSession = await axios.post('/api/create-checkout-session',{
      items:items,
      email:session.user.email
    })
  }

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto ">
        {/*     left div */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
            className=""
          />

          <div className="flex flex-col p-5 space-y-10 bg-white shadown-sm">
            <h1 className="text-3xl border-b pb-4 ">
              {items.length === 0 && session
                ? `Your basket is empty ${session.user.name}`
                : "Your Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                description={item.description}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>

        {/* RIGHT DIV */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="UGX" />0
                </span>
              </h2>
              <button onClick={createCheckoutSession} role="link" className="button mt-2 ">
                {!session ? "Login to Checkout" : "Proceed To Checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
