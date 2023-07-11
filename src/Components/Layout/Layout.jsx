import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default function Layout({userdata ,setuserData}) {
  let Navigate = useNavigate();
  function logOut(){
    localStorage.removeItem('token')
    setuserData(null)
    Navigate('/login')
  }
  return <>
    <Navbar userdata={userdata} logOut={logOut}/>
    <div className="container">
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}
