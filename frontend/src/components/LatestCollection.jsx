import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";
import { motion } from "framer-motion";

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

  //animation variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, rotate: -10, y: 30 },
    show: {
      opacity: 1,
      rotate: 0,
      y: 0,
      transition: { type: "spring", stiffness: 80 },
    },
  };

  return (
    <section className="my-5 dark:text-white">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Discover the Latest in "} text2={"Laptop Innovation!"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base">
          Explore our latest additions to the laptop collection. Discover
          cutting-edge technology and powerful performance.
        </p>
      </div>
      <motion.div
        className="grid pl-[5px] grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 gap-x-2 justify-items-center sm:justify-items-start"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {latestProducts.map((item, index) => (
          <motion.div key={index} variants={itemVariants} className="w-full">
            <ProductItem
              id={item._id}
              image={item.image[0]}
              name={item.name}
              price={item.price}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default LatestCollection;
