import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProdectRote(props) {
  if(localStorage.getItem('token') !== null){
    return props.children;
  }else{
   return <Navigate to={'/login'} />
  }
}
