import React, { useContext, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { authContext } from '../AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

const Login = () => {
  const {login,user}=useContext(authContext)
  const [error,setError]=useState(null)
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.path || '/'
  const HandleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const values = {
      email,
      password
    }

    login(email,password)
    .then(result =>{
      const user = result.user;
      console.log(user)
      setError('')
      navigate(from, {replace:true})
      toast.success('login Succesfull')
    })
    .catch(err=>{
      console.log(err.code)
      if(err.code === 'auth/user-not-found'){
        setError('Please Enter A Valid Email')
      }
      else if(err.code === 'auth/wrong-password'){
        setError('Please Enter a Valid Password')
      }
      else{
        setError(error.code)
      }
    })
  }
  return (
    <div className='style'>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">

          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-10">
            <form onSubmit={HandleSubmit}>
            <div className="card-body p-10">
              <h1 className='font-extrabold mb-6'><span className='text-green-700 '>Social</span> Media</h1>
              <h1 className="text-4xl text-center text-green-700 font-bold mb-2">Sign in</h1><hr />
              <div className="form-control pt-5">
                <div className='m-auto gap-3 flex'>
                  <Link to='/'><FcGoogle size={30}></FcGoogle></Link>
                  <Link to='/'><FaFacebookSquare className='text-blue-600' size={30}></FaFacebookSquare></Link>
                  <Link to='/'><FaLinkedin className='text-blue-600' size={30}></FaLinkedin></Link>
                </div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' placeholder="email" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <p className='text-red-600'>{error}</p>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <div>
                <h2>Don't have account?<span className='font-bold'><Link to='/register'>SignUp</Link></span></h2>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;