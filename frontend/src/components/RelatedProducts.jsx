import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProducts = ({ category }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    // Only update when products change
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => item.category === category);
      setRelated(productsCopy.slice(0, 3));
    }
  }, [products]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl font-bold mb-10">
        <Title text1={"Related"} text2={"Products"} />
      </div>

      <div className="grid pl-[5px] grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 gap-x-2 justify-items-center sm:justify-items-start">
        {related.map((item, index) => (
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

export default RelatedProducts;
