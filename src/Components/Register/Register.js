import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsCardImage } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../AuthProvider/AuthProvider';

const Register = () => {
    const {register}=useContext(authContext)

    const ImgKey = 'fdde59a723ff8c12f5f78263fde57252';

    // const [image,setImage]=useState('')
    const navigate = useNavigate()
    const HandleRegister = event=>{
        event.preventDefault();
        const form = event.target;
        const formData=new FormData();
        const FirstName = form.fName.value;
        const LastName = form.lName.value;
        const email = form.email.value;
        const birthday = form.birthday.value;
        const password = form.password.value;
        const imgData= form.image.files[0];
        // console.log(imgData)
        formData.append('image',imgData)


        // send imag in imgbb
        fetch(`https://api.imgbb.com/1/upload?key=5da252869bb0313bcea6da6b65d7a4f1`,{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                console.log(data)
                const values = {
                    FirstName,
                    LastName,
                    email,
                    birthday,
                    password,
                    img:data?.data?.url
                }
                fetch('http://localhost:5000/users',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(values)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })

        register(email,password)
        .then(result=>{
            const user = result.user;
            console.log(user)
            navigate('/')
            toast.success('Registration done succesfully')
        })
        .catch(err=>console.log(err))
            }
        })

        
    }

    return (
            <div className="hero min-h-screen bg-sky-100">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold"><span className='text-green-700'>Social</span> Media</h1>
                        <p className="py-6 text-xl">This platform will helps you connect and share with the people in your life.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        
                        <form onSubmit={HandleRegister}>
                        <div className="card-body">
                        <div>
                            <h1 className='text-center text-3xl font-bold text-green-500'>SignUp</h1>
                        </div>
                            <div className="form-control">
                                <label className="label" htmlFor='f-name'>
                                    <span className="label-text">First Name</span>
                                </label>
                                <input type="text" name='fName' placeholder="First Name" className="input input-bordered" id='f-name' required/>
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor='l-name'>
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input type="text" name='lName' placeholder="Last Name" className="input input-bordered" id='l-name' required/>
                            </div>
                            <div className="form-control" >
                                <label className="label" htmlFor='email'>
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" id='email' required/>
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor='date'>
                                    <span className="label-text">Birthdate</span>
                                </label>
                                <input type="date" name='birthday' placeholder="Birthdate" className="input input-bordered" id='date' required/>
                            </div>
                            <div>
                                <label htmlFor="photo" className='label grid text-green-400'><BsCardImage size={70}></BsCardImage><h1 className='text-black'>Click here to add photo</h1></label>
                                <input className='hidden' id='photo' name='image' type="file" />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor='pass'>
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" id='pass' required/>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary bg-green-700">SignUp</button>
                            </div>
                            <div>
                                <h2>Already have an account?<Link to='/login'><span className='font-bold'>Login</span></Link></h2>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default Register;