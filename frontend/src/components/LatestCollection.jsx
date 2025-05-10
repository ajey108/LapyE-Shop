import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);
  //console.log(latestProducts);

  useEffect(() => {
    // Only update when products change
    if (products.length > 0) {
      setLatestProducts(products.slice(0, 4));
    }
  }, [products]); // Add products as a dependency

  return (
    <div className="my-5 dark:text-white  ">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Discover the Latest in "} text2={"Laptop Innovation!"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base">
          Explore our latest additions to the laptop collection. Discover
          cutting-edge technology and powerful performance.
        </p>
      </div>

      {/* Render products */}
      <div className="grid pl-[5px] grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 gap-x-2 justify-items-center sm:justify-items-start">
        {latestProducts.map((item, index) => (
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
  );
};

export default LatestCollection;
