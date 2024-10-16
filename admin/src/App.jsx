import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add'
import List from './pages/List';
import Orders from './pages/Orders';
import { useState ,useEffect} from 'react';
import Login from './components/Login';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const  currency = '₹';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen">
      <ToastContainer />
      
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr className="border-gray-700" />
          
          <div className="flex flex-col md:flex-row w-full">
            {/* Sidebar for Desktop and Mobile */}
            <div className="md:w-1/4 w-full">
              <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="w-full md:w-3/4 mx-auto p-4 text-gray-300">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
