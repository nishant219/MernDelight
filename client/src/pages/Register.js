import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { BsFillPersonFill } from 'react-icons/bs';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError]=useState(null);
  const [success, setSuccess]= useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('https://server-mern-delight.vercel.app/api/v1/signup', {
        name,
        email,
        password,
      },{
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsRegistered(true);
        setSuccess( 'Registration successful!' ); 
        console.log('Registered successfully');
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setError(error.response.data.message || 'Registration failed');
    }
  };

  if (isRegistered) {
    //return <p className="text-green-500 text-center text-2xl mt-4">You are registered!</p>;
    //redirect to login page
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-[400px] m-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <BsFillPersonFill className="text-6xl m-auto" />
      <p className="text-center mb-4">Create an account to continue</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-400 text-white py-2 px-4 rounded block w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
