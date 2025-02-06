import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);
  console.log(latestProducts);

  useEffect(() => {
    // Only update when products change
    if (products.length > 0) {
      setLatestProducts(products.slice(0, 4));
    }
  }, [products]); // Add products as a dependency

  return (
    <div className="my-5">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Newly"} text2={"Added"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, et.
        </p>
      </div>

      {/* Render products */}
      <div className="grid border-b-4  pl-[50px] grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 gap-x-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image[0]} // Access the first image in the array
            name={item.name}
            price={item.price}
          />
        ))}
      </div>

      <hr className="h-4" />
    </div>
  );
};

export default LatestCollection;
