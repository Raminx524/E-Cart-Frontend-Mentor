import { ICartItem, IProduct } from "@/App";
import { useState, useEffect } from "react";
import useDeviceType from "@/services/useDeviceType";

interface ProductItemProps {
  product: IProduct;
  cart: ICartItem[];
  setCart: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}

function ProductItem(props: ProductItemProps) {
  const deviceType = useDeviceType();
  const { product, cart, setCart } = props;

  const productFromCart = cart.find((cartItem) => cartItem.id === product.id);
  const [isInCart, setIsInCart] = useState(productFromCart !== undefined);

  useEffect(() => {
    const foundProduct = cart.find((cartItem) => cartItem.id === product.id);
    setIsInCart(foundProduct !== undefined);
  }, [cart, product.id]);

  function addToCart(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: IProduct
  ) {
    if (!isInCart) {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  }

  function handleQuantityChange(productId: string, action: string) {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) => {
          if (cartItem.id === productId) {
            const newQuantity =
              action === "INCREMENT"
                ? cartItem.quantity + 1
                : cartItem.quantity - 1;
            return { ...cartItem, quantity: newQuantity };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity > 0)
    );
  }

  return (
    <li className="space-y-8">
      <div className="relative">
        <img
          className={`rounded-lg max-w-80 ${
            isInCart ? "outline outline-myRed" : ""
          }`}
          src={
            deviceType === "mobile"
              ? product.image.mobile
              : product.image.desktop
          }
        />
        <button
          className={`px-3 absolute -bottom-5 left-20 h-10 w-40 rounded-full border ${
            !isInCart ? "bg-white border-myRose-500" : "bg-myRed border-myRed"
          }  `}
          onClick={(ev) => addToCart(ev, product)}
        >
          {isInCart ? (
            <div className="flex justify-between w-full items-center text-white">
              <div
                onClick={(ev) => {
                  ev.stopPropagation();
                  handleQuantityChange(product.id, "DECREMENT");
                }}
                className="text-xl rounded-full border border-white w-4 h-4 flex items-center justify-center p-2"
              >
                -
              </div>
              <p>{productFromCart?.quantity}</p>
              <div
                onClick={(ev) => {
                  ev.stopPropagation();
                  handleQuantityChange(product.id, "INCREMENT");
                }}
                className="text-xl rounded-full border border-white w-4 h-4 flex items-center justify-center p-2"
              >
                +
              </div>
            </div>
          ) : (
            <div className="flex gap-2 text-base font-semibold text-myRose-900">
              <img src="src/assets/images/icon-add-to-cart.svg" />
              <p>Add to Cart</p>
            </div>
          )}
        </button>
      </div>
      <div>
        <span className="text-sm text-myRose-400">{product.category}</span>
        <h3 className="font-bold text-myRose-900">{product.name}</h3>
        <p className="text-myRed font-semibold">${product.price.toFixed(2)}</p>
      </div>
    </li>
  );
}

export default ProductItem;
