import React, { useState } from 'react'
import {useFormik } from 'formik';
import * as yub from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Register() {
  let Navigate = useNavigate();
  const [apiError, setapiError] = useState('')
  const [loading, setloading] = useState(false)

  let validition = yub.object({
    name: yub.string().required('name is required').min(3).max(15),
    email: yub.string().required('email is required').email(),
    password: yub.string().required('password is required').matches(/^[A-z][a-z0-9]/,'password must start capital latter and small and numbers'),
    rePassword: yub.string().required('rePassword is required').oneOf([yub.ref('password')]),
    phone: yub.string().required('phone is required').matches(/^01[1250][0-9]{8}$/),
  })
  async function apiReq(values){
    setloading(true)
    let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup` , values).catch((err)=>{
      // setapiError(err.response.data.message);
      setapiError(` ${err.response.data.errors.param} : ${err.response.data.errors.msg}`)
      setloading(false)
    })
    if(data.message ==="success"){
      setloading(false);
      Navigate('/login')
    }
  }
  let formik = useFormik({
    initialValues:{
      name :'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema: validition,
    onSubmit:apiReq
    
  })
  return (
    <>
      <p className='text-capitalize text-info'>Register now</p>
      {apiError?<div className="alert alert-danger" role="alert">{apiError}</div>:''}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="neme">name</label>
        <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id='name' 
        className='form-control mb-3'  type="text" />
        {formik.errors.name && formik.touched.name?<div className="alert alert-danger" role="alert">
            {formik.errors.name}
          </div>:''}

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

        <label htmlFor="rePassword">rePassword</label>
        <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id='rePassword' 
        className='form-control mb-3'  type="password" />
        {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger" role="alert">
            {formik.errors.rePassword}
          </div>:''}
        <label htmlFor="phone">phone</label>
        <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id='phone' 
        className='form-control mb-3'  type="tel" />
        {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger" role="alert">
            {formik.errors.phone}
          </div>:''}
        
        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-info'>{loading?<i className='fas fa-spinner fa-spin'></i>:'Register'}</button>
      </form>
    </>
  )
}
