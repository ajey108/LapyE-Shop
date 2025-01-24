import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    // Only update when products change
    if (products.length > 0) {
      setBestSellers(products.filter((product) => product.bestseller === true));
    }
  }, [products]);
  return (
    <section className="py-16 px-4 border-b-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center text-3xl mb-12">
          <Title text1="Best" text2="Sellers" />
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Discover our most popular products loved by customers worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4">
          {bestSellers.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image[0]}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
