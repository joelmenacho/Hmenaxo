import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginCard from '../components/LoginCard';



const Login = () => {
    return (
        <div className="App">
        <Header/>
        <main>
          <div>
            <LoginCard/>
          </div>
        </main>
        <Footer/>
      </div>
    )
}

export default Login;