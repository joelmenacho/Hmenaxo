
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route name="home" path='/' exact  element={<Home/>}  />
      <Route name="login" path='/login' exact  element={<Login/>}  />
      <Route name="register" path='/registro' exact  element={<Register/>}  />
    </Routes>
    </BrowserRouter>
 
  );
}

export default App;