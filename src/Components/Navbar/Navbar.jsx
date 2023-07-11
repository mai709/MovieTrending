import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({userdata ,logOut}) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to='/'><h3>Noxe</h3></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            {userdata?<ul className="navbar-nav me-auto mb-2 mb-lg-0 ">

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to='movies'>Movies</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" to='Tvshow'>Tvshow</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to='people'>People</Link>
              </li>



            </ul>:''}
            
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">

              <li className="nav-item d-flex align-items-center">
                <Link className='text-white' to={`https://www.facebook.com`}>
                  <i className='fab mx-2 fa-facebook'></i>               
                </Link>
                <Link className='text-white' to={`https://www.facebook.com`}>
                  <i className='fab mx-2 fa-twitter'></i>               
                </Link>
                <Link className='text-white' to={`https://www.facebook.com`}>
                  <i className='fab mx-2 fa-instagram'></i>               
                </Link>
                <Link className='text-white' to={`https://www.facebook.com`}>
                  <i className='fab mx-2 fa-soundcloud'></i>               
                </Link>
                
              </li>


              {userdata?<li className="nav-item">
                <span onClick={logOut}  className="nav-link pointer">Logout</span>
              </li>:<>
              <li className="nav-item">
                <Link className="nav-link active" to='register'>Register</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" to='login'>Login</Link>
              </li>
              </>}
              


              

            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
