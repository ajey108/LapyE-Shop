import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Submit handler function
    const submitHandler = async (e) => {
        e.preventDefault();  

        try {
            const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });
            console.log('Login response:', response);
          
            if (response.data.success) {
               setToken(response.data.token);
             
            } else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
           
        }
    };

    return (
        <div className="flex items-center justify-center mb-4 cursor-pointer min-h-[80vh] min-w-[80vw]">
            <div className="border top-8 text-black p-4">
                <h1>Admin Login</h1>
                <form onSubmit={submitHandler} className='mt-9'>
                    <div className="mb-4">
                        <p>Email</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className='rounded-lg'
                            value={email}
                            type="email"
                            placeholder='your email'
                            autoComplete='email'
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <p>Password</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className='rounded-lg'
                            value={password}
                            type="password"
                            placeholder='your password'
                            autoComplete='current-password'  // Changed to 'current-password'
                            required
                        />
                    </div>

                    <button className='bg-black text-white py-2 px-4 rounded-lg'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
