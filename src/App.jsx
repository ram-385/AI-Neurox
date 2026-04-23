import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./componensts/auth/authPages/Login";
import Signup from "./componensts/auth/authPages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;

