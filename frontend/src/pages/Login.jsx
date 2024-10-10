import React from 'react'
import { Form } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [currentState,setCurrentState] = useState('Login');
  return (
   <form onSubmit={(e) => e.preventDefault()} className='flex flex-col items-center w-[90%] max-w-[500px] m-auto mt-14 mb-4 gap-4 cursor-pointer' method='post' action="">
    <div className="inline-flex items-center gap-2 mb-2 mt-10">
      <p className='parata-regular text-3xl'>{currentState}</p>
      <hr className='w-8 border-none h-[1.2px] bg-gray-700' />
    </div>

   {currentState === 'Login' ? '' : <input className='border border-gray-400 px-3 py-2 rounded w-full' placeholder='Name' type="text" />} 
    <input className='border border-gray-400 px-3 py-2 rounded w-full' placeholder='Email' type="Email" />
    <input className='border border-gray-400 px-3 py-2 rounded w-full' placeholder='Password' type="Password" />
    <div className="w-full flex justify-around text-sm mt-[-8px] ">
      <p className='text-gray-400 '>Forgot you password</p>
      {
        currentState === 'Login' ? <p onClick={() => setCurrentState('Sign up')}>Create account</p>
        : <p onClick={() => setCurrentState('Login')}>Login Here</p>
      }
    </div>
    <button className='bg-black text-white text-xs px-10 py-4 rounded-lg'>{currentState === 'Login'?'Log In':'Sign Up'}</button>
   </form>
  )
}

export default Login