
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route name="home" path='/' exact  element={<Home/>}  />
      <Route name="login" path='/login' exact  element={<Login/>}  />
    </Routes>
    </BrowserRouter>
 
  );
}

export default App;