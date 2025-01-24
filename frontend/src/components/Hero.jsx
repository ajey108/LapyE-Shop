import laptopbanner from "../assets/laptopbanner.png";

const Banner = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg flex flex-col sm:flex-row items-center p-6 border border-gray-200 max-w-7xl mx-auto">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
          Empower Your Productivity
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Discover the latest in technology with our sleek laptops, thoughtfully
          designed to boost your workflow and elevate your everyday experience.
        </p>
        <button className="mt-6 bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:shadow-md transition duration-200">
          Learn More
        </button>
      </div>
      <div className="flex-1 p-4">
        <img
          className="w-full h-auto rounded-lg object-cover shadow-md"
          src={laptopbanner}
          alt="A sleek laptop on a desk showcasing technology"
        />
      </div>
    </div>
  );
};

export default Banner;
