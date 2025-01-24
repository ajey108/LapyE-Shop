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
        className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
      >
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={name}
            className="h-[280px] w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
          />
        </div>

        <div className="p-4">
          <h3 className="text-sm text-gray-700 font-medium line-clamp-2 mb-2">
            {name}
          </h3>

          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-900">
              <span className="text-sm font-normal">{currency}</span>
              {price}
            </p>

            <button className="text-xs bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductItem;
