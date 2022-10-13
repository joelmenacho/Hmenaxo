import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import RegisterSimpleCard from '../components/RegisterCard';



const Register = () => {
    return (
        <div className="App">
        <Header/>
        <main>
          <div>
            <RegisterSimpleCard/>
          </div>
        </main>
        <Footer/>
      </div>
    )
}

export default Register;