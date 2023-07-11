import React, { useState } from 'react'
import {useFormik } from 'formik';
import * as yub from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Login({saveUserData}) {
  let Navigate = useNavigate();
  const [apiError, setapiError] = useState('')
  const [loading, setloading] = useState(false)

  let validition = yub.object({
    email: yub.string().required('email is required').email(),
    password: yub.string().required('password is required').matches(/^[A-z][a-z0-9]/,'password must start capital latter and small and numbers'),
  })
  async function apiReq(values){
    setloading(true)
    let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin` , values).catch((err)=>{
      setapiError(err.response.data.message);
      setloading(false)
    })
    if(data.message ==="success"){
      localStorage.setItem('token',data.token);
      saveUserData();
      setloading(false);
      Navigate('/')
    }
  }
  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema: validition,
    onSubmit:apiReq
    
  })
  
  return (
    <>
      <p className='text-capitalize text-info'>Login now</p>
      {apiError?<div className="alert alert-danger" role="alert">{apiError}</div>:''}
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="email">email</label>
        <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id='email' 
        className='form-control mb-3'  type="text" />
        {formik.errors.email && formik.touched.email?<div className="alert alert-danger" role="alert">
            {formik.errors.email}
          </div>:''}

        <label htmlFor="password">password</label>
        <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id='password' 
        className='form-control mb-3'  type="password" />
        {formik.errors.password && formik.touched.password?<div className="alert alert-danger" role="alert">
            {formik.errors.password}
          </div>:''}

        
        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-info'>{loading?<i className='fas fa-spinner fa-spin'></i>:'Register'}</button>
      </form>
    </>
  )
}
