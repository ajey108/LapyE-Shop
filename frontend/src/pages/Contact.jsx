import Title from "../components/Title";
import NewsletterSubscription from "../components/NewsletterSubscription";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={
            "https://img.freepik.com/premium-photo/mix-office-supplies-gadgets-wooden-desk-with-text_93675-141818.jpg"
          }
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">TechWorld Store</p>
          <p className=" text-gray-500">
            1234 Tech Avenue <br /> Suite 500, Silicon Valley, CA, USA
          </p>
          <p className=" text-gray-500">
            Tel: (415) 555-0132 <br /> Email: support@techworld.com
          </p>
          <p className="font-semibold text-xl text-gray-600">Join Our Team</p>
          <p className=" text-gray-500">
            Explore career opportunities at TechWorld and be part of the future
            of laptop innovation.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsletterSubscription />
    </div>
  );
};

export default Contact;
