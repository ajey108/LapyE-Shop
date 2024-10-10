import React from 'react'
import Title from '../components/Title'
import NewletterSubscription from '../components/NewsletterSubscription'



const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={'https://m.media-amazon.com/images/G/31/img24/Glap/gw/pea/v1/Amazon_Diwali2024_Gaming1_1400x800._SX1242_QL85_.jpg'} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>At TechWorld, we are passionate about making cutting-edge technology accessible to everyone. Our journey started with one goal: to provide a seamless shopping experience for laptop enthusiasts, professionals, and everyday users alike.</p>
              <p>We handpick every laptop in our store, ensuring they meet the highest standards of performance, durability, and design. Whether you're looking for the latest gaming laptop, a reliable work machine, or an affordable everyday device, we have something for everyone.</p>
              <b className='text-gray-800'>Our Mission</b>
              <p>At TechWorld, our mission is to empower users with top-tier laptops that cater to their specific needs. From powerful processors to sleek designs, we offer only the best in modern computing, ensuring you find the perfect device with ease and confidence.</p>
          </div>
      </div>

      <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Expert Selection:</b>
            <p className=' text-gray-600'>Our team of tech experts carefully selects each laptop, ensuring top performance and value for every budget.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Seamless Shopping:</b>
            <p className=' text-gray-600'>With our easy-to-navigate platform and fast checkout process, finding and purchasing the right laptop has never been simpler.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Unmatched Customer Support:</b>
            <p className=' text-gray-600'>Our dedicated customer support team is here to guide you, offering expert advice and ensuring your satisfaction every step of the way.</p>
          </div>
      </div>

     <NewletterSubscription/>
      
    </div>
  )
}

export default About
