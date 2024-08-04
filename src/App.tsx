import { useEffect, useState } from "react";
import ProductItem from "./components/productItem";
import Cart from "./components/Cart";
const PRODUCT_URL = "http://localhost:8001/products";

export interface IProductImg {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}
export interface IProduct {
  id: string;
  image: IProductImg;
  name: string;
  category: string;
  price: number;
}

export interface ICartItem extends IProduct {
  quantity: number;
}

function App() {
  const [products, setProducts] = useState<null | IProduct[]>(null);
  const [cart, setCart] = useState<ICartItem[]>([]);
  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch(PRODUCT_URL);
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        console.log(err);
      }
    }
    getProducts();
  }, []);
  if (!products) return <p>Loading...</p>;
  return (
    <div className="bg-myRose-50 py-8 font-red-hat flex flex-col">
      <div className="w-5/6 mx-auto space-y-7 md:flex">
        <div className="flex flex-col gap-7 items-center">
          <h1 className="font-bold text-4xl">Desserts</h1>
          <ul className="flex flex-col gap-5 md:flex-row md:flex-wrap">
            {products.map((product: IProduct) => {
              return (
                <ProductItem
                  key={product.id}
                  product={product}
                  cart={cart}
                  setCart={setCart}
                />
              );
            })}
          </ul>
        </div>
        <Cart cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}

export default App;
