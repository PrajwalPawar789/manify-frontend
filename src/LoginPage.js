// Import necessary libraries and components
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from './MANLITICS-LOGOn.webp'; // Your logo image

const LoginPage = () => {
    // State hooks for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // Hook for navigation
    const navigate = useNavigate();

    // Function to handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submit action

        try {
            // Attempt to login via your API
            const response = await axios.post(
                'http://localhost:5030/api/v1/login',
                { username, password },
                { withCredentials: true }
            );
            // If login is successful, navigate to the search page
            if (response.data.success) {
                navigate('/search');
            }
        } catch (error) {
            // Log any login errors
            console.error('Login failed:', error);
        }
    };

    // JSX for the LoginPage component
    return (
        <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-center py-0 sm:px-6 lg:px-0">
            <div className="gap-4 items-center">
                {/* Image Section */}
                <div className="lg:col-span-7 hidden lg:block">
                    {/* <img src={YourImage} alt="A relevant descriptive alt text" className="w-[95.6%] h-full  object-cover"/> */}
                </div>
                {/* Login Form Section */}
                <div className="lg:col-span-3 sm:mx-auto sm:w-full sm:max-w-md">
                    <img src={Logo} alt="Your Logo" className="mx-auto h-12 w-auto"/>
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Log in to your account
                    </h2>
                    {/* <p className="mt-2 text-center text-sm leading-5 text-gray-600">
                        Or <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                            start your 14-day free trial
                        </a>
                    </p> */}
                    <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleLogin}>
                            {/* Username Input */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700">
                                    Username
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input id="username" name="username" type="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                            </div>
                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input id="password" name="password" type="password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            {/* Remember Me and Forgot Password */}
                            {/* <div className="flex items-center justify-between"> */}
                                {/* <div className="flex items-center">
                                    <input id="remember_me" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                    <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm leading-5">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                        Forgot your password?
                                    </a>
                                </div> */}
                            {/* </div> */}
                            {/* Submit Button */}
                            <div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Log in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default LoginPage;

