import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProdectRote from './Components/ProdectedRoute/ProdectRote';
import MovieDetails from './Components/MovieDetails/MovieDetails';



function App() {
  useEffect(()=>{
    if(localStorage.getItem('token')){
      saveUserData();
    }
  },[])
    const [userdata,setuserData] =useState(null)

  let routers = createBrowserRouter([
    { path: "", element: <Layout userdata={userdata} setuserData={setuserData} /> , children: [
      {index:true , element: <Home/> },
      {path:"movies" , element:<ProdectRote><Movies/></ProdectRote> },
      {path:"tvshow" , element: <ProdectRote><Tvshow/></ProdectRote>},
      {path:"people" , element:<ProdectRote><People/></ProdectRote> },
      {path:"moviedetails/:id/:mediaType" , element:<ProdectRote><MovieDetails/></ProdectRote> },
      {path:"login" , element: <Login saveUserData = {saveUserData}/>},
      {path:"register" , element:<Register/> },
      {path:"*" , element: <Notfound/>},
    ]}
  ])
  
  function saveUserData(){
    let encodedToken = localStorage.getItem('token');
    let decodeToken = jwtDecode(encodedToken); 
    setuserData(decodeToken);
  }

  return <RouterProvider router={routers}></RouterProvider>
}

export default App;
