import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Routes,Route} from 'react-router-dom';
import Add from './pages/Add'
import List from './pages/List';
import Orders from './pages/Orders';

const App = () => {

  const [token,setToken] = useState('');
  return (
   <div className='bg-gray-800 text-white min-h-screen'>
   <>
  
   <Navbar/>
   <hr />
   <div className="flex w-full">
    <Sidebar/>
    <div className="w-[70%] mx-auto ml-[max(5vw,25px) my-8 text-gray-600 text-base]"></div>
    <Routes>
      <Route path='/add' element={<Add/>}/>
      <Route path='/add' element={<List/>}/>
      <Route path='/add' element={<Orders/>}/>
    </Routes>
   </div>
   </>
   </div>
  )
}

export default App