import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoMdArrowDropupCircle } from "react-icons/io";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collections = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sort, setSort] = useState("relevant");

  // Handle category filter checkbox
  const handleCategory = (e) => {
    if (e.target.checked) {
      setCategory([...category, e.target.value]);
    } else {
      setCategory(category.filter((item) => item !== e.target.value));
    }
  };

  // Consolidated filtering and sorting logic in a single useEffect
  useEffect(() => {
    // Step 1: Apply category and search filters
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // Step 2: Apply sorting
    switch (sort) {
      case "low-high":
        productsCopy = productsCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        productsCopy = productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(productsCopy);
  }, [products, showSearch, search, category, sort]); // Dependencies for filtering and sorting

  return (
    <div className="dark:text-white px-4 sm:px-10 pt-10 border-t  mb-2">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Sidebar Filter Section */}
        <div
          className={`sm:w-1/4 transition-all duration-300 ${
            showFilter ? "w-full" : "w-0 overflow-hidden sm:overflow-visible"
          }`}
        >
          <div className="mb-4 flex justify-between items-center sm:hidden">
            <p
              onClick={() => setShowFilter(!showFilter)}
              className="my-2 text-xl flex items-center gap-2 cursor-pointer font-semibold"
            >
              Filters
              <IoMdArrowDropupCircle
                size={40}
                className={`${showFilter ? "rotate-180" : ""}`}
              />
            </p>
          </div>

          <div
            className={`border border-gray-300 rounded-lg p-4 ${
              showFilter ? "block" : "hidden sm:block"
            }`}
          >
            <p className="mb-3 text-lg font-semibold">Categories</p>
            <div className="flex flex-col gap-4 text-md ">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={"Professional"}
                  onChange={handleCategory}
                  className="w-4 h-4"
                />
                Professional
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={"OfficeWork"}
                  onChange={handleCategory}
                  className="w-4 h-4"
                />
                OfficeWork
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={"Gaming"}
                  onChange={handleCategory}
                  className="w-4 h-4"
                />
                Gaming
              </label>
            </div>
          </div>
        </div>

        {/* Product Grid Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <Title text1="All" text2="Collections" />
            {/* Sort options */}
            <select
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 focus:ring-2 focus:ring-gray-400"
            >
              <option value="relevant">Sort by Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          {/* Responsive Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filterProducts.length > 0 ? (
              filterProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item._id}
                  image={item.image[0]}
                  name={item.name}
                  price={item.price}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
