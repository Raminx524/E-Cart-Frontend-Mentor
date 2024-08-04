import { ICartItem, IProduct } from "@/App";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CartProps {
  cart: ICartItem[];
  setCart: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}
function Cart(props: CartProps) {
  const { cart, setCart } = props;
  return (
    <div className="bg-white rounded-lg p-6 space-y-6 h-fit w-5/6 min-w-80 mx-auto">
      <h2 className="text-myRed font-bold text-2xl">
        Your Cart ({cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0)})
      </h2>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center gap-2">
          <img src="src/assets/images/illustration-empty-cart.svg" />
          <p className="text-myRose-500 text-sm font-semibold">
            Your added items will appear here
          </p>
        </div>
      ) : (
        cart.map((cartItem: ICartItem) => (
          <div
            key={cartItem.id}
            className="flex justify-between items-center border-b pb-5"
          >
            <div className="space-y-2">
              <p className="font-semibold text-myRose-900 text-sm">
                {cartItem.name}
              </p>
              <div className="flex gap-4 items-center">
                <span className="text-myRed font-semibold text-sm">
                  {cartItem.quantity}x
                </span>
                <div className="space-x-2">
                  <span className="text-myRose-400 text-sm">
                    @ ${cartItem.price.toFixed(2)}
                  </span>
                  <span className="text-myRose-400 font-semibold text-sm">
                    ${(cartItem.price * cartItem.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() =>
                setCart((prevCart) =>
                  prevCart.filter(
                    (prevCartItem) => prevCartItem.id !== cartItem.id
                  )
                )
              }
              className="rounded-full border p-1 h-5 w-5 border-myRose-400 flex items-center justify-center group hover:border-2"
            >
              <img src="src/assets/images/icon-remove-item.svg" />
            </button>
          </div>
        ))
      )}
      <div className="flex justify-between items-center">
        <p className="text-sm text-myRose-500 font-medium">Order Total</p>
        <p className="text-2xl font-bold">
          $
          {cart
            .reduce((acc, cartItem) => {
              return acc + +cartItem.price * +cartItem.quantity;
            }, 0)
            .toFixed(2)}
        </p>
      </div>
      <div className="flex gap-2 bg-myRose-50 py-4 px-3 rounded-lg justify-center">
        <img src="src/assets/images/icon-carbon-neutral.svg" />
        <p className="text-sm text-myRose-900">
          This is a<span className="font-semibold mx-1">carbon-neutral</span>
          delivery
        </p>
      </div>

      <Dialog>
        <DialogTrigger className="bg-myRed w-full rounded-full text-white py-4 hover:bg-red-800">
          Confirm Order
        </DialogTrigger>
        <DialogContent className="rounded-lg">
          <DialogHeader className="text-left space-y-3 flex flex-col items-start">
            <img
              src="src/assets/images/icon-order-confirmed.svg"
              className="w-12 mb-2"
            />
            <DialogTitle className="text-myRose-900 font-bold text-5xl">
              Order Confirmed
            </DialogTitle>
            <DialogDescription className="text-myRose-500">
              We hope you enjoy your food!
            </DialogDescription>
          </DialogHeader>
          <div className="bg-myRose-50 rounded-lg p-5">
            <div>
              {cart.map((cartItem: ICartItem) => (
                <div
                  key={cartItem.id}
                  className="flex justify-between items-center border-b pb-5"
                >
                  <div className="flex gap-4">
                    <img
                      src={cartItem.image.thumbnail}
                      className="w-12 rounded-lg"
                    />
                    <div className="space-y-2">
                      <p className="font-semibold text-myRose-900 text-sm">
                        {cartItem.name}
                      </p>
                      <div className="flex gap-4 items-center">
                        <span className="text-myRed font-semibold text-sm">
                          {cartItem.quantity}x
                        </span>
                        <div className="space-x-2">
                          <span className="text-myRose-400 text-sm">
                            @ ${cartItem.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-myRose-900 font-semibold text-lg">
                    ${(cartItem.price * cartItem.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-">
              <p className="text-sm text-myRose-500 font-medium">Order Total</p>
              <p className="text-2xl font-bold">
                $
                {cart
                  .reduce((acc, cartItem) => {
                    return acc + +cartItem.price * +cartItem.quantity;
                  }, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button
                type="submit"
                onClick={() => setCart([])}
                className="bg-myRed w-full rounded-full text-white py-4 hover:bg-red-800"
              >
                Start New Order
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Cart;
