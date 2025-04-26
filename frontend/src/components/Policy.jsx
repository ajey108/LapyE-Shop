import { TbExchange } from "react-icons/tb";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";

const Policy = () => {
  return (
    <div className=" dark:text-white container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-8">Our Policies</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Policy 1 */}
        <div className=" p-6 rounded-lg shadow-lg text-center">
          <TbExchange className="text-5xl mx-auto text-gray-950 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Easy Exchange</h2>
          <p className="">
            We offer a hassle-free exchange policy for your convenience. If you
            are not satisfied, you can easily exchange your product within 30
            days.
          </p>
        </div>

        {/* Policy 2 */}
        <div className="  p-6 rounded-lg shadow-lg text-center">
          <IoShieldCheckmarkSharp className="text-5xl mx-auto text-gray-950 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Secure Payment</h2>
          <p className="">
            Your transactions are secured with end-to-end encryption, ensuring
            that your data remains safe and protected at all times.
          </p>
        </div>

        {/* Policy 3 */}
        <div className="  p-6 rounded-lg shadow-lg text-center">
          <MdSupportAgent className="text-5xl mx-auto text-gray-950 mb-4" />
          <h2 className="text-xl font-semibold mb-2">24/7 Support</h2>
          <p className="">
            Our dedicated customer support team is available 24/7 to assist you
            with any queries or issues you may have.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
