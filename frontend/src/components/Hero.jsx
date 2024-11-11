import laptopbanner from "../assets/laptopbanner.png";

const Banner = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center p-4 border-4 border-gray-400 bg-gray-100">
      <div className="flex-1 p-4">
        <h1 className=" text-2xl font-bold mb-2">Empower Your Productivity</h1>
        <p className="text-gray-700">
          Discover the latest in technology with our sleek laptops designed to
          enhance your workflow and elevate your experience.
        </p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Learn More
        </button>
      </div>
      <div className="flex-1">
        <img
          className="w-full object-cover"
          src={laptopbanner}
          alt="A sleek laptop on a desk showcasing technology"
        />
      </div>
    </div>
  );
};

export default Banner;
