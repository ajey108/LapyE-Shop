import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, image, price }) => {
  const { currency } = useContext(ShopContext);
  return (
    <>
      {/* By clicking on product item it'll nav to /product */}

      <Link
        to={`/product/${id}`}
        className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200"
      >
        {/* Image Section */}
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={name}
            className="h-[280px] w-full object-cover object-center group-hover:scale-105 group-hover:opacity-90 transition-transform transition-opacity duration-300"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Product Name */}
          <h3 className="text-sm text-gray-700 font-medium line-clamp-2 group-hover:text-black transition-colors duration-200">
            {name}
          </h3>

          {/* Price and Button */}
          <div className="flex items-center justify-between">
            {/* Price */}
            <p className="text-lg font-semibold text-gray-900">
              <span className="text-sm font-normal text-gray-500 mr-1">
                {currency}
              </span>
              {price}
            </p>

            {/* Button */}
            <button className="text-xs bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-black transition-colors duration-200">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductItem;
