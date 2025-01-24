const NewsletterSubscription = () => {
  return (
    <div className="  p-6 rounded-lg shadow-lg max-w-[90%] my-4 mx-auto text-center">
      <p className="text-3xl font-bold">Subscribe & Save 20%!</p>
      <p className=" mt-3">
        Join our newsletter and stay updated with exclusive offers and updates.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-6 flex flex-col sm:flex-row items-center gap-3"
      >
        <input
          className="flex-1 px-4 py-3 rounded-md outline-none border border-gray-300 focus:ring-2 focus:ring-blue-300"
          type="email"
          placeholder="Enter your email address"
          required
        />
        <button
          className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-500 transition duration-200"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterSubscription;
