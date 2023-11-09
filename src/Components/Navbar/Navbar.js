import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../AuthProvider/AuthProvider';

const Navbar = () => {
  const [uInfo,setUInfo]=useState([])
// console.log(uInfo)
  //       const currentUser=login[0];
  //       console.log(currentUser)

  const { logout, user } = useContext(authContext)


  const HandleLogout = () => {
    logout()
      .then()
      .catch(err => console.log(err))
  }

  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data=>setUInfo(data))
  },[])

  
  const login = uInfo?.filter(info=>info?.email===user?.email)
  const currentUser=login[0]


  return (
    <div className="navbar bg-green-50">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost normal-case text-xl text-bold">Social Media</Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered" />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={currentUser?.img} alt=''/>
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            {
              user?.email && <Link className='font-bold'>{user?.email}</Link>
            }
            <li>
              <Link to='/profile' className="justify-between">
                Profile
              </Link>
            </li>
            <li><a>Settings</a></li>

            <li><button onClick={HandleLogout}>Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;