import {
  HiCheck as CheckIcon,
  HiXMark as XMarkIcon,
  HiQuestionMarkCircle as QuestionMarkCircleIcon,
} from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Link } from "react-router-dom";
import {
  removeProductFromTheCart,
  updateProductQuantity,
} from "../features/cart/cartSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-[#FEF7F1] mx-auto max-w-screen-2xl px-5 max-[400px]:px-3">
      <div className="pb-24 pt-16">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl text-center mb-8">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {productsInCart.map((product) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-24 w-24 object-cover object-center sm:h-48 sm:w-48 rounded-lg shadow-md"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-lg font-semibold text-gray-800">
                            <Link
                              to={`/product/${product.id}`}
                              className="hover:text-yellow-500 transition"
                            >
                              {product.name}
                            </Link>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{product.availability}</p>
                        </div>
                        <p className="mt-1 text-lg font-medium text-gray-900">
                          €{product.price}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor="quantity" className="mr-5 text-gray-700">Quantity: </label>
                        <input
                          type="number"
                          id="quantity"
                          className="w-16 h-7 indent-1 bg-white border rounded-md text-center"
                          value={product?.quantity}
                          onChange={(e) => {
                            dispatch(
                              updateProductQuantity({
                                id: product?.id,
                                quantity: parseInt(e.target.value),
                              })
                            );
                          }}
                        />

                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            onClick={() =>{
                              dispatch(
                                removeProductFromTheCart({ id: product?.id })
                              ); toast.error("Product removed from the cart");}
                            }
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product?.availability ? (
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <XMarkIcon
                          className="h-5 w-5 flex-shrink-0 text-red-600"
                          aria-hidden="true"
                        />
                      )}

                      <span>
                        {product?.availability ? "In stock" : `Out of stock`}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-[#FFB606] px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 rounded-md shadow-md"
          >
            <h2
              id="summary-heading"
              className="text-2xl font-semibold text-white"
            >
              Order Summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-lg text-white">Subtotal</dt>
                <dd className="text-lg font-medium text-white">
                  €{subtotal}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-lg text-white">
                  <span>Shipping Estimate</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-white hover:text-gray-500"
                  >
                    <span className="sr-only">
                      Learn more about how shipping is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </a>
                </dt>
                <dd className="text-lg font-medium text-white">
                  €{subtotal === 0 ? 0 : 5.0}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-lg text-white">
                  <span>Tax Estimate</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-white hover:text-gray-500"
                  >
                    <span className="sr-only">
                      Learn more about how tax is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </a>
                </dt>
                <dd className="text-lg font-medium text-white">
                  €{subtotal / 5}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-xl font-semibold text-white">
                  Order Total
                </dt>
                <dd className="text-xl font-semibold text-white">
                  €{subtotal === 0 ? 0 : subtotal + subtotal / 5 + 5}
                </dd>
              </div>
            </dl>

            {productsInCart.length > 0 && (
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="text-white bg-black text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center max-md:text-base rounded-md hover:bg-gray-800 transition"
                >
                  Checkout
                </Link>
              </div>
            )}
          </section>
        </form>
      </div>
    </div>
  );
};
export default Cart;
