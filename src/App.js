import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Singup from "./Pages/Signup/Singup";
import Forgot from "./Pages/Forgot/Forgot";
import Reset from "./Pages/Reset/Reset";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return <>
    <div className="main">
    <Toaster/>

      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset/:token/:id" element={<Reset/>} />
        <Route path="/dash" element={<Dashboard />} />
      </Routes>
     
    </div>
  </>
}

export default App;
