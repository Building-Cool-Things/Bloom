
// import { AnimatePresence } from "framer-motion"
import { Route, Routes, useLocation } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import './App.css'
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import CheckUser from "./pages/CheckUser";
import PrivateRoutes from "./components/PrivateRoutes";
import Dashboard from "./pages/Main/Dashboard";
import Bloom from "./pages/Main/Bloom";
import BloomTracking from "./pages/Main/BloomTracking";


const App = () => {
  const location = useLocation();



  return (
    <div className="flex flex-col h-screen">
        <Navbar />
        <Routes location={location} key={location.pathname}>
          <Route path="/check" element={<CheckUser />} />
          <Route path="/sign-in" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/bloom/:name/:id' element={<Bloom />} />
            <Route path='/bloom/:name/:id/tracking' element={<BloomTracking />} />

          </Route>

        </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </div>

  )
}

export default App