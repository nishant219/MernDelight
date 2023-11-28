import React from 'react';
import { FaDribbbleSquare, FaFacebookSquare, FaGithubSquare, FaInstagramSquare, FaTwitterSquare  } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='max-w-[1520px] m-auto px-4 py-2 bg-[#24262b]'>
        <div className='py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-400'>
            <div>
                <h1 className='text-3xl font-bold w-full text-orange-700'>MERN Delights :) </h1>
                <p className='mb-4'>🌟 Striving for Greatness 🌟 </p>
                <p className='mb-4'>Thank you for using our Recipe Application! We're dedicated to providing you with a seamless experience.</p>
                <p className='mb-4'>Explore the app to discover new culinary horizons, organize your recipes, and unleash your creativity.</p>
                <div className='flex justify-between md:w-[75%] my-6'>
                    <FaDribbbleSquare className='text-3xl' />
                    <FaFacebookSquare className='text-3xl' />
                    <FaGithubSquare className='text-3xl' />
                    <FaInstagramSquare className='text-3xl' />
                    <FaTwitterSquare className='text-3xl' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer;